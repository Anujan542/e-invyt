export type TemplateSelectionProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
  setTemplateId: React.Dispatch<React.SetStateAction<string>>;
  setTemplatePrice: React.Dispatch<React.SetStateAction<number>>;
  setTemplateDuration: React.Dispatch<React.SetStateAction<number>>;
};