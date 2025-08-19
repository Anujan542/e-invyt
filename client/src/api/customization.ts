import axiosInstance from '@/utils/axios';
import type {
  customizationTemplateDetails,
  Feedbackprops,
  payHereDetails,
  renderProps,
} from './template.types';

export const customizationTemplate = (data: customizationTemplateDetails) =>
  axiosInstance.post('/customize', data);

export const updateCustomizationTemplate = (id: string, data: customizationTemplateDetails) => {
  return axiosInstance.patch(`/customize/${id}`, data);
};

export const payHere = (data: payHereDetails) => axiosInstance.post('/orders/payhere', data);

export const renderVideo = (orderId: string) =>
  axiosInstance.post(`/orders/render-template/${orderId}`);

export const renderProgress = (data: renderProps) => axiosInstance.post(`/orders/render`, data);

export const getOrderDetails = () => {
  return axiosInstance.get('/orders/getOrder');
};

export const sendFeedback = (data: Feedbackprops) => axiosInstance.post('/contact', data);