/**
 * @file AddChildModal.tsx
 * @description Modal form for adding a new child profile.
 * @module src/components/features/dashboard/AddChildModal
 */
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { queryKeys } from '@/constants';
import { logger } from '@/monitoring';
import { userService } from '@/services';
import { Modal } from '@/components/ui';

const addChildSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'prefer-not-to-say'], { errorMap: () => ({ message: 'Select a gender' }) }),
  yearGroup: z.string().trim().min(1, 'Year group is required'),
  medicalConditions: z.string().optional(),
  emergencyContactName: z.string().trim().min(1, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().trim().min(1, 'Emergency contact phone is required'),
});

const INITIAL = {
  firstName: '', lastName: '', dateOfBirth: '', gender: '',
  yearGroup: '', medicalConditions: '', emergencyContactName: '', emergencyContactPhone: '',
};

interface IAddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChildModal = ({ isOpen, onClose }: IAddChildModalProps) => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState({ ...INITIAL });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const set = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((er) => { const n = { ...er }; delete n[field]; return n; });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const parsed = addChildSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { if (typeof i.path[0] === 'string') errs[i.path[0]] = i.message; });
      setErrors(errs);
      return;
    }
    setIsSaving(true);
    try {
      await userService.createChild({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        dateOfBirth: parsed.data.dateOfBirth,
        gender: parsed.data.gender,
        yearGroup: parsed.data.yearGroup,
        medicalConditions: parsed.data.medicalConditions,
        emergencyContacts: [{ name: parsed.data.emergencyContactName, phone: parsed.data.emergencyContactPhone, relationship: 'Parent/Guardian' }],
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.children() });
      setValues({ ...INITIAL });
      onClose();
    } catch {
      setSubmitError('Failed to add child. Please try again.');
      logger.error('Add child failed');
    } finally {
      setIsSaving(false);
    }
  };

  const Field = ({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) => (
    <label className="block" htmlFor={id}>
      <span className="mb-1 block font-body text-sm text-[#3C3C3C]">{label}</span>
      {children}
      {error && <p className="mt-1 font-body text-xs text-red-600" role="alert">{error}</p>}
    </label>
  );

  const inputCls = (err?: string) =>
    `w-full rounded-sm border px-3 py-2.5 font-body text-sm outline-none transition ${err ? 'border-red-400' : 'border-[#CFCFCF]'} focus:border-[#90D4C1] focus:ring-1 focus:ring-[#90D4C1]/40`;

  return (
      <Modal ariaLabel="Add child information" isOpen={isOpen} onClose={onClose} size="md">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="font-body text-xl font-semibold text-[#121212]">Add child Information</h2>
            <p className="mt-1 font-body text-sm text-[#64748B]">Please provide information about the child</p>
          </div>
          <button aria-label="Close" className="mt-1 text-[#94A3B8] hover:text-[#121212]" onClick={onClose} type="button">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>
          </button>
        </div>

      <Modal.Body>
        <form id="add-child-form" noValidate onSubmit={(e) => { void handleSubmit(e); }}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field error={errors.firstName} id="firstName" label="First name">
                <input className={inputCls(errors.firstName)} id="firstName" onChange={set('firstName')} placeholder="First name" type="text" value={values.firstName} />
              </Field>
              <Field error={errors.lastName} id="lastName" label="Last name">
                <input className={inputCls(errors.lastName)} id="lastName" onChange={set('lastName')} placeholder="Last name" type="text" value={values.lastName} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field error={errors.dateOfBirth} id="dateOfBirth" label="Date of birth">
                <input className={inputCls(errors.dateOfBirth)} id="dateOfBirth" onChange={set('dateOfBirth')} type="date" value={values.dateOfBirth} />
              </Field>
              <Field error={errors.gender} id="gender" label="Gender">
                <select className={inputCls(errors.gender)} id="gender" onChange={set('gender')} value={values.gender}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </Field>
            </div>
            <Field error={errors.yearGroup} id="yearGroup" label="Year group">
              <input className={inputCls(errors.yearGroup)} id="yearGroup" onChange={set('yearGroup')} placeholder="e.g. Year 4" type="text" value={values.yearGroup} />
            </Field>
            <Field error={errors.medicalConditions} id="medicalConditions" label="Any additional medical notes / allergies">
              <textarea className={inputCls(errors.medicalConditions)} id="medicalConditions" onChange={set('medicalConditions')} placeholder="Please list any medical conditions or dietary requirements..." rows={3} value={values.medicalConditions} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field error={errors.emergencyContactName} id="emergencyContactName" label="Emergency contact name">
                <input className={inputCls(errors.emergencyContactName)} id="emergencyContactName" onChange={set('emergencyContactName')} placeholder="Full name" type="text" value={values.emergencyContactName} />
              </Field>
              <Field error={errors.emergencyContactPhone} id="emergencyContactPhone" label="Emergency contact phone">
                <input className={inputCls(errors.emergencyContactPhone)} id="emergencyContactPhone" onChange={set('emergencyContactPhone')} placeholder="+44..." type="tel" value={values.emergencyContactPhone} />
              </Field>
            </div>
            <p className="flex items-center gap-2 rounded-sm bg-blue-50 px-3 py-2.5 font-body text-xs text-[#415372]">
              ℹ This information helps us ensure the safety and wellbeing of all participants.
            </p>
            {submitError && <p className="font-body text-sm text-red-600" role="alert">{submitError}</p>}
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <button className="rounded-sm px-5 py-2.5 font-body text-sm text-[#414141] transition hover:bg-gray-100" disabled={isSaving} onClick={onClose} type="button">Cancel</button>
        <button className="rounded-sm bg-[#90D4C1] px-5 py-2.5 font-body text-sm font-medium text-[#121212] transition hover:bg-[#7dc9b6] disabled:opacity-60" disabled={isSaving} form="add-child-form" type="submit">
          {isSaving ? 'Saving…' : 'Save profile'}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
