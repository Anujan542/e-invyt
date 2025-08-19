import { useEffect, useMemo, useState } from 'react';
import { StepperHome } from './stepper/Stepper';
import { TemplateSelction } from './templateSelection/TemplateSelction';
import { TemplateEdit } from './templateEdit/TemplateEdit';
import { TemplateFinal } from './templateFinal/TemplateFinal';
import { format } from 'date-fns';
import { TeamplteSongs } from './templateEdit/songs';
import { useLocation } from 'react-router-dom';

const audios = TeamplteSongs;

const TemplateContainer = () => {
  const location = useLocation();
  const EditData = location.state;

  const inputs = EditData?.customizationId?.inputs;

  const [currentStep, setCurrentStep] = useState(EditData?.currentStep ?? 1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(inputs?.name ?? '');
  const [templateDuration, setTemplateDuration] = useState<number>(inputs?.duration ?? 0);
  const [templateId, setTemplateId] = useState<string>(EditData?.customizationId?.templateId ?? '');
  const [templatePrice, setTemplatePrice] = useState<number>(EditData?.amountPaid ?? 0);
  const [selectedAudio, setSelectedAudio] = useState<string>(inputs?.audio ?? audios[0].name);

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

  useEffect(() => {
    if (EditData?.customizationId?.inputs) {
      setWeddingDetails((prev) => ({
        ...prev,
        ...EditData.customizationId.inputs, // overwrite only if exists
      }));
    }
  }, [EditData]);

  useEffect(() => {
    if (!EditData) return;

    const inputs = EditData.customizationId?.inputs;

    setCurrentStep(EditData.currentStep ?? 1);
    setSelectedTemplate(inputs?.name ?? '');
    setTemplateDuration(inputs?.duration ?? 0);
    setTemplateId(EditData.customizationId?.templateId ?? '');
    setTemplatePrice(EditData.amountPaid ?? 0);
    setSelectedAudio(inputs?.audio ?? audios[0].name);
  }, [EditData]);

  // selectedAudio can be either a name or a URL
  const selectedAudioObj = useMemo(() => {
    if (!audios?.length) return undefined;
    const target = (selectedAudio || '').trim();
    if (!target) return audios[0];
    return audios.find((a) => a.name === target || a.url === target) ?? audios[0];
  }, [selectedAudio]);

  const audioUrl = selectedAudioObj?.url ?? '';

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
          templateDuration={templateDuration}
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
          customizationId={EditData?.customizationId?._id}
        />
      )}
    </div>
  );
};

export default TemplateContainer;
