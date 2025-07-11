/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import type { TemplateFinalProps } from './TemplateFinal.types';
import { Player } from '@remotion/player';
import CinematicLove from '@/remotion/templates/ElegantBliss';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { customizationTemplate, payHere } from '@/api/customization';
import toast from 'react-hot-toast';
import type { customizationTemplateDetails } from '@/api/template.types';
import { Loader2 } from 'lucide-react';

export const TemplateFinal = ({
  currentStep,
  setCurrentStep,
  weddingDetails,
  templateId,
  templatePrice,
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
        form.action = 'https://sandbox.payhere.lk/pay/checkout';

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

  const handleSubmit = (formData: customizationTemplateDetails) => {
    customizationTemplateMutation.mutate(formData);
  };

  const handleDownload = () => {
    if (isAuthorized) {
      handleSubmit({ templateId: templateId, inputs: weddingDetails });
    } else {
      navigate('/login');
    }
  };

  const isLoading = customizationTemplateMutation.isPending || payHereMutation.isPending;

  return (
    <>
      <div className="mx-auto max-w-5xl px-6 flex flex-row items-center justify-center gap-5">
        <div className="">
          <Player
            component={CinematicLove}
            durationInFrames={575}
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
            }}
          />
        </div>
        <div className="">
          <Button className="cursor-pointer" size="lg" onClick={handleDownload}>
            {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
            {isLoading ? '' : 'Download'}
          </Button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-5">
        <Button
          variant="outline"
          className="w-32 cursor-pointer"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Prev step
        </Button>
        {/* <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          // disabled={currentStep > steps.length}
        >
          Next step
        </Button> */}
      </div>
    </>
  );
};
