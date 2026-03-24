/**
 * @file useKnowledgeHubSummary.ts
 * @description Aggregates key knowledge-hub resource counts from the public data endpoints.
 * @module src/hooks/useKnowledgeHubSummary
 */
import { useCaseStudies } from '@/hooks/useCaseStudies';
import { useFaqSections } from '@/hooks/useFaqSections';
import { useFreeActivities } from '@/hooks/useFreeActivities';

export const useKnowledgeHubSummary = () => {
  const caseStudiesQuery = useCaseStudies();
  const freeActivitiesQuery = useFreeActivities();
  const faqSectionsQuery = useFaqSections();

  return {
    data: {
      caseStudiesCount: caseStudiesQuery.data.length,
      faqCount: faqSectionsQuery.data.reduce((total, group) => total + group.items.length, 0),
      freeActivitiesCount: freeActivitiesQuery.data.reduce((total, group) => total + group.downloads.length, 0),
    },
    error: caseStudiesQuery.error ?? freeActivitiesQuery.error ?? faqSectionsQuery.error,
    isError: caseStudiesQuery.isError || freeActivitiesQuery.isError || faqSectionsQuery.isError,
    isFetching: caseStudiesQuery.isFetching || freeActivitiesQuery.isFetching || faqSectionsQuery.isFetching,
    isLoading: caseStudiesQuery.isLoading || freeActivitiesQuery.isLoading || faqSectionsQuery.isLoading,
    refetch: async () => {
      await Promise.all([
        caseStudiesQuery.refetch(),
        freeActivitiesQuery.refetch(),
        faqSectionsQuery.refetch(),
      ]);
    },
  };
};
