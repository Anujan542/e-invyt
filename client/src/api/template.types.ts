export type TemplateDetails = {
  _id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  previewVideoUrl: string;
  category: 'wedding' | 'birthday' | 'party' | 'other';
  isActive?: boolean;
  price: number;
  duration: number;
  remotionCompositionId: string;
};

export type TemplateData = TemplateDetails[];

export type InvitationDetails = {
  groomName: string;
  brideName: string;
  groomFamilyInfo: string;
  brideFamilyInfo: string;
  welcomeMessage: string;
  eventVenue: string;
  eventDate: string;
  templateColor: string;
  duration: number;
  name: string;
  audio: string;
};

export type customizationTemplateDetails = {
  templateId: string;
  inputs: InvitationDetails;
};

export type payHereDetails = {
  customizationId: string;
  amount: number;
};

export type renderProps = {
  renderId: string;
};

export type Feedbackprops = {
  name: string;
  email: string;
  message: string;
};