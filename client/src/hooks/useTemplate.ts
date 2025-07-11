import { getTemplates } from '@/api/template.api';
import { useQuery } from '@tanstack/react-query';

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates,
  });
};
