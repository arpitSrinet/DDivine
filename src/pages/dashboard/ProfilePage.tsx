/**
 * @file ProfilePage.tsx
 * @description Parent profile — personal details (editable) and security section.
 * @module src/pages/dashboard/ProfilePage
 */
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { ParentDashboardLayout } from '@/components/layout';
import { queryKeys } from '@/constants';
import { DASHBOARD_COPY } from '@/copy';
import { useProfile } from '@/hooks/useProfile';
import { logger } from '@/monitoring';
import { userService } from '@/services';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';
import { useAuthStore } from '@/store';

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const authUser = useAuthStore((s) => s.user);
  const { data: profile, isLoading, isError } = useProfile();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '',
    addressLine1: '', addressLine2: '', town: '', postcode: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone ?? '',
        addressLine1: profile.addressLine1 ?? '',
        addressLine2: profile.addressLine2 ?? '',
        town: profile.town ?? '',
        postcode: profile.postcode ?? '',
      });
    }
  }, [profile]);

  const set = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaving(true);
    try {
      await userService.updateProfile({ ...form });
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() });
      setEditing(false);
    } catch {
      setSaveError('Failed to save changes. Please try again.');
      logger.error('Profile update failed');
    } finally {
      setSaving(false);
    }
  };

  const userName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : authUser ? `${authUser.firstName} ${authUser.lastName}` : '—';

  const fieldCls = 'w-full rounded-sm border border-[#CFCFCF] bg-[#F8FAFC] px-3 py-2.5 font-body text-sm text-[#121212] outline-none';
  const editFieldCls = 'w-full rounded-sm border border-[#CFCFCF] px-3 py-2.5 font-body text-sm text-[#121212] outline-none transition focus:border-[#90D4C1] focus:ring-1 focus:ring-[#90D4C1]/40';

  return (
    <>
      <PageSEO description={SEO_META.dashboard.description} noIndex={SEO_META.dashboard.noIndex} title={DASHBOARD_COPY.profile.pageTitle} />
      <ParentDashboardLayout activeTab="profile" userName={userName}>
        {isLoading && <p className="font-body text-sm text-[#64748B]">Loading profile…</p>}
        {isError && <p className="font-body text-sm text-red-600" role="alert">Failed to load profile. Please refresh.</p>}

        {!isLoading && (
          <div className="grid grid-cols-[1fr_auto] gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
            {/* Personal Details */}
            <section>
              <form noValidate onSubmit={(e) => { void handleSave(e); }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-body text-base font-semibold text-[#121212]">Personal Details</h2>
                    <p className="font-body text-sm text-[#64748B]">Update your account information and contact details.</p>
                  </div>
                  {!editing && (
                    <button className="font-body text-sm text-[#415372] underline underline-offset-4 hover:text-[#08193A]" onClick={() => setEditing(true)} type="button">
                      Edit
                    </button>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <label className="block" htmlFor="firstName">
                    <span className="mb-1 block font-body text-xs text-[#64748B]">Full Name</span>
                    {editing
                      ? <input className={editFieldCls} id="firstName" onChange={set('firstName')} placeholder="First name" type="text" value={form.firstName} />
                      : <div className={fieldCls}>{form.firstName} {form.lastName}</div>
                    }
                  </label>
                  <label className="block" htmlFor="email">
                    <span className="mb-1 block font-body text-xs text-[#64748B]">Email Address</span>
                    <div className={fieldCls}>{profile?.email ?? authUser?.email ?? '—'}</div>
                  </label>
                  <label className="block" htmlFor="phone">
                    <span className="mb-1 block font-body text-xs text-[#64748B]">Phone Number</span>
                    {editing
                      ? <input className={editFieldCls} id="phone" onChange={set('phone')} placeholder="+44..." type="tel" value={form.phone} />
                      : <div className={fieldCls}>{form.phone || '—'}</div>
                    }
                  </label>
                </div>

                <label className="mt-4 block" htmlFor="addressLine1">
                  <span className="mb-1 block font-body text-xs text-[#64748B]">Residential Address</span>
                  {editing
                    ? <div className="space-y-2">
                        <input className={editFieldCls} id="addressLine1" onChange={set('addressLine1')} placeholder="Address line 1" type="text" value={form.addressLine1} />
                        <input className={editFieldCls} onChange={set('addressLine2')} placeholder="Address line 2 (optional)" type="text" value={form.addressLine2} />
                        <div className="grid grid-cols-2 gap-2">
                          <input className={editFieldCls} onChange={set('town')} placeholder="Town" type="text" value={form.town} />
                          <input className={editFieldCls} onChange={set('postcode')} placeholder="Postcode" type="text" value={form.postcode} />
                        </div>
                      </div>
                    : <div className={`${fieldCls} min-h-[100px] whitespace-pre-wrap`}>
                        {[form.addressLine1, form.addressLine2, form.town, form.postcode].filter(Boolean).join('\n') || '+ Add a new address'}
                      </div>
                  }
                </label>

                {saveError && <p className="mt-3 font-body text-sm text-red-600" role="alert">{saveError}</p>}

                {editing && (
                  <div className="mt-6 flex items-center gap-3">
                    <button className="rounded-sm px-5 py-2.5 font-body text-sm text-[#414141] transition hover:bg-gray-100" disabled={saving} onClick={() => { setEditing(false); setSaveError(''); }} type="button">
                      Cancel
                    </button>
                    <button className="rounded-sm bg-[#90D4C1] px-6 py-2.5 font-body text-sm font-medium text-[#121212] transition hover:bg-[#7dc9b6] disabled:opacity-60" disabled={saving} type="submit">
                      {saving ? 'Saving…' : DASHBOARD_COPY.profile.saveButton}
                    </button>
                  </div>
                )}
              </form>
            </section>

            {/* Security */}
            <aside>
              <div className="rounded-sm bg-[#F8FAFC] p-6">
                <h2 className="font-body text-base font-semibold text-[#121212]">Security</h2>
                <p className="mt-1 font-body text-sm text-[#64748B]">Keep your account secure by using a strong password.</p>
                <div className="mt-4 space-y-3">
                  {['CURRENT PASSWORD', 'NEW PASSWORD', 'CONFIRM PASSWORD'].map((label) => (
                    <label className="block" key={label}>
                      <span className="mb-1 block font-body text-xs font-medium tracking-wide text-[#64748B]">{label}</span>
                      <input className="w-full rounded-sm border border-[#CFCFCF] px-3 py-2.5 font-body text-sm outline-none focus:border-[#90D4C1] focus:ring-1 focus:ring-[#90D4C1]/40" type="password" />
                    </label>
                  ))}
                  <button className="mt-2 w-full rounded-sm border border-[#B6B6B6] py-2.5 font-body text-sm text-[#121212] transition hover:bg-gray-100" type="button">
                    Update password
                  </button>
                </div>
                <div className="mt-6 rounded-sm bg-red-50 p-4">
                  <p className="font-body text-sm text-red-600">Permanently delete your account and all associated data.</p>
                  <button className="mt-2 font-body text-sm text-red-600 underline underline-offset-4 hover:text-red-800" type="button">
                    Deactivate account
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </ParentDashboardLayout>
    </>
  );
};

export default ProfilePage;
