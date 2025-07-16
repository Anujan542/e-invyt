import axiosInstance from '@/utils/axios';
import type { customizationTemplateDetails, payHereDetails } from './template.types';

export const customizationTemplate = (data: customizationTemplateDetails) =>
  axiosInstance.post('/customize', data);

export const payHere = (data: payHereDetails) => axiosInstance.post('/orders/payhere', data);

export const renderVideo = (orderId: string) =>
  axiosInstance.post(`/orders/render-template/${orderId}`);