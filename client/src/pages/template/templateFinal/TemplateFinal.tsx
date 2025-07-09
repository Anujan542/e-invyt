import { Button } from "@/components/ui/button"
import type { TemplateFinalProps } from "./TemplateFinal.types"
import { Player } from '@remotion/player';
import CinematicLove from '@/remotion/templates/CinematicLove';

export const TemplateFinal = ({
  currentStep,
  setCurrentStep,
  weddingDetails,
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
        {/* <div className="">
          <Button size="lg">
            <span>Download</span>
          </Button>
        </div> */}
      </div>
      <div className="flex justify-center space-x-4 mt-5">
        <Button
          variant="outline"
          className="w-32"
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
