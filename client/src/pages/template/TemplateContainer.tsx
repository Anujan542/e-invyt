import { useState } from 'react';
import { StepperHome } from './stepper/Stepper';
import { TemplateSelction } from './templateSelection/TemplateSelction';
import { TemplateEdit } from './templateEdit/TemplateEdit';
import { TemplateFinal } from './templateFinal/TemplateFinal';
import { format } from 'date-fns';
import { TeamplteSongs } from './templateEdit/songs';

const audios = TeamplteSongs;

const TemplateContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templateDuration, setTemplateDuration] = useState<number>(0);
  const [templateId, setTemplateId] = useState<string>('');
  const [templatePrice, setTemplatePrice] = useState<number>(0);
  const [selectedAudio, setSelectedAudio] = useState(audios[0].name);

  const [weddingDetails, setWeddingDetails] = useState({
    groomName: 'Surya',
    brideName: 'Jothika',
    groomFamilyInfo: 'Son of Mr & Mrs Sivakumar',
    brideFamilyInfo: 'Daughter of Mr & Mrs Ravichandran',
    welcomeMessage:
      'With great pleasure, our families invite you to join us for the wedding reception of',
    eventVenue:
      "At six o'clock in the evening  Lee Maridean Hotel 855, Hospital Road,Kalmunai, Sri Lanka",
    eventDate: format(new Date(), 'd | MMMM | yyyy'),
    templateColor: '#000000',
  });

  const selectedAudioUrl = audios.find((a) => a.name === selectedAudio);
  const audioUrl = selectedAudioUrl?.url ?? '';

  return (
    <div className="flex-1">
      <StepperHome currentStep={currentStep} setCurrentStep={setCurrentStep} />

      {currentStep === 1 && (
        <TemplateSelction
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          selectedTemplate={selectedTemplate!}
          setSelectedTemplate={setSelectedTemplate}
          setTemplateId={setTemplateId}
          setTemplatePrice={setTemplatePrice}
          setTemplateDuration={setTemplateDuration}
        />
      )}
      {currentStep === 2 && (
        <TemplateEdit
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          weddingDetails={weddingDetails}
          setWeddingDetails={setWeddingDetails}
          selectedTemplate={selectedTemplate!}
          audios={audios}
          selectedAudio={selectedAudio}
          setSelectedAudio={setSelectedAudio}
          audioUrl={audioUrl}
        />
      )}
      {currentStep === 3 && (
        <TemplateFinal
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          weddingDetails={weddingDetails}
          templateId={templateId}
          templatePrice={templatePrice}
          selectedTemplate={selectedTemplate!}
          audioUrl={audioUrl}
          templateDuration={templateDuration}
        />
      )}
    </div>
  );
};

export default TemplateContainer;
