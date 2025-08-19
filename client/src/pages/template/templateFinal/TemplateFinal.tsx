/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import type { TemplateFinalProps } from './TemplateFinal.types';
import { Player } from '@remotion/player';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { customizationTemplate, payHere, updateCustomizationTemplate } from '@/api/customization';
import toast from 'react-hot-toast';
import type { customizationTemplateDetails } from '@/api/template.types';
import { Loader2 } from 'lucide-react';
import { templateMap } from '@/remotion/Templates';

export const TemplateFinal = ({
  currentStep,
  setCurrentStep,
  weddingDetails,
  templateId,
  templatePrice,
  selectedTemplate,
  audioUrl,
  templateDuration,
  customizationId,
}: TemplateFinalProps) => {
  const {
    groomName,
    brideName,
    groomFamilyInfo,
    brideFamilyInfo,
    eventDate,
    eventVenue,
    templateColor,
    welcomeMessage,
  } = weddingDetails;
  const navigate = useNavigate();
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  const SelectedComponent = templateMap[selectedTemplate];

  if (!SelectedComponent) {
    throw new Error(`Unknown template name: ${selectedTemplate}`);
  }

  const payHereMutation = useMutation({
    mutationFn: payHere,
  });

  const customizationTemplateMutation = useMutation({
    mutationFn: customizationTemplate,
    onSuccess: async (res) => {
      const customizationId = res.data._id;

      try {
        const res = await payHereMutation.mutateAsync({ customizationId, amount: templatePrice });

        const formData = res.data.payHereFormData;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `${import.meta.env.VITE_PAYMENT_GATEWAY}/pay/checkout`;

        for (const key in formData) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
      } catch (err: any) {
        console.error('Payment initiation failed', err);
        toast.error(err?.response?.data?.message || 'Something went wrong');
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    },
  });

  const customizationDraftTemplateMutation = useMutation({
    mutationFn: customizationTemplate,
    onSuccess: async (res) => {
      const customizationId = res.data._id;

      try {
        await payHereMutation.mutateAsync({ customizationId, amount: templatePrice });
        toast.success(
          'Your data has been saved as a draft. You can download it anytime from the Order section.',
          {
            duration: 6000,
            position: 'top-right',
          }
        );
        navigate('/template-selection');
      } catch (err: any) {
        console.error('Payment initiation failed', err);
        toast.error(err?.response?.data?.message || 'Something went wrong');
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    },
  });

  const updateDraftMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: customizationTemplateDetails }) =>
      updateCustomizationTemplate(id, formData),
    onSuccess: () => {
      toast.success('Draft updated successfully!', {
        duration: 4000,
        position: 'top-right',
      });
      navigate('/template-selection');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update draft');
    },
  });

  const handleSubmit = async (formData: customizationTemplateDetails) => {
    if (customizationId) {
      // Update existing draft
      try {
        const res = await payHereMutation.mutateAsync({ customizationId, amount: templatePrice });

        const formData = res.data.payHereFormData;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `${import.meta.env.VITE_PAYMENT_GATEWAY}/pay/checkout`;

        for (const key in formData) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
      } catch (err: any) {
        console.error('Payment initiation failed', err);
        toast.error(err?.response?.data?.message || 'Something went wrong');
      }
    } else {
      // Create new
      customizationTemplateMutation.mutate(formData);
    }
  };

  const handleDownload = () => {
    if (isAuthorized) {
      handleSubmit({
        templateId: templateId,
        inputs: {
          ...weddingDetails,
          duration: templateDuration,
          name: selectedTemplate,
          audio: audioUrl,
        },
      });
    } else {
      navigate('/login');
    }
  };

  const handleSaveDraft = (formData: customizationTemplateDetails) => {
    if (customizationId) {
      // Update existing draft
      updateDraftMutation.mutate({ id: customizationId, formData });
    } else {
      // Create new draft
      customizationDraftTemplateMutation.mutate(formData);
    }
  };

  const isLoading = customizationTemplateMutation.isPending || payHereMutation.isPending;

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
        <div className="w-full md:w-auto flex justify-center">
          <Player
            component={SelectedComponent}
            durationInFrames={templateDuration}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={30}
            style={{
              width: 280,
              height: 500,
              borderRadius: '0.75rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
            controls
            allowFullscreen={false}
            hideControlsWhenPointerDoesntMove={1000}
            inputProps={{
              groomName: groomName,
              brideName: brideName,
              groomFamilyInfo: groomFamilyInfo,
              brideFamilyInfo: brideFamilyInfo,
              welcomeMessage: welcomeMessage,
              eventDate: eventDate,
              eventVenue: eventVenue,
              color: templateColor,
              audio: audioUrl,
            }}
          />
          <div className="absolute mt-60 flex items-center justify-center pointer-events-none opacity-70">
            <span className="text-xl md:text-xl lg:text-3xl text-black">E-Invyt Preview</span>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-6">
            <Button
              className="w-52 cursor-pointer bg-black dark:bg-white text-white dark:text-black hover:scale-105 hover:bg-amber-50 transition-transform"
              size="lg"
              onClick={() => {
                handleSaveDraft({
                  templateId: templateId,
                  inputs: {
                    ...weddingDetails,
                    duration: templateDuration,
                    name: selectedTemplate,
                    audio: audioUrl,
                  },
                });
              }}
            >
              Save Draft
              {/* {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
              {isLoading ? '' : 'Save Draft'} */}
            </Button>
            <Button className="cursor-pointer" size="lg" onClick={handleDownload}>
              {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
              {isLoading ? '' : 'Download'}
            </Button>
          </div>
          <div className="flex justify-center space-x-4 mt-5">
            <Button
              variant="outline"
              className="w-32 cursor-pointer"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 1}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
