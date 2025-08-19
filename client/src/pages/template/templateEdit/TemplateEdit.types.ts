export type WeddingDetails = {
  groomName: string;
  brideName: string;
  groomFamilyInfo: string;
  brideFamilyInfo: string;
  welcomeMessage: string;
  eventVenue: string;
  eventDate: string;
  templateColor: string;
};

export type AudioProps = {
  name: string;
  label?: string;
  url: string;
};

export type TemplateEditProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  weddingDetails: WeddingDetails;
  setWeddingDetails: React.Dispatch<React.SetStateAction<WeddingDetails>>;
  selectedTemplate: string;
  audios: AudioProps[];
  selectedAudio: string;
  setSelectedAudio: React.Dispatch<React.SetStateAction<string>>;
  audioUrl: string;
  templateDuration: number;
};
