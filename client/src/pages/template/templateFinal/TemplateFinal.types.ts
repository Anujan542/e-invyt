import type { WeddingDetails } from '../templateEdit/TemplateEdit.types';

export type TemplateFinalProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  weddingDetails: WeddingDetails;
  templateId: string;
  templatePrice: number;
  selectedTemplate: string;
  audioUrl: string;
  templateDuration: number;
  customizationId: string | null;
};
