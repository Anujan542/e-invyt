import axiosInstance from '@/utils/axios';
import type { TemplateData } from './template.types';

export const getTemplates = async () => {
  const res = await axiosInstance.get<TemplateData>('/templates');
  return res.data;
};