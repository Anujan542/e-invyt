import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@/components/ui/stepper';
// import { DynamicIcon } from 'lucide-react/dynamic';
import type { StepperProps } from './Stepper.types';

export const StepperHome = ({ currentStep, setCurrentStep }: StepperProps) => {
  const steps = [
    {
      step: 1,
      label: 'Select Design',
      // icon: <DynamicIcon name="shield-check" className="w-4 h-4 mr-1" />,
    },
    {
      step: 2,
      label: 'Customize Design',
      // icon: <DynamicIcon name="clipboard-edit" className="w-4 h-4 mr-1" />,
    },
    {
      step: 3,
      label: 'Finailze Design',
      // icon: <DynamicIcon name="rewind" className="w-4 h-4 mr-1" />,
    },
  ];

  return (
    <div className="flex-1 wrapper">
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          {steps.map(({ step, label }) => (
            <StepperItem key={step} step={step} className="not-last:flex-1">
              <StepperTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  {/* Number */}
                  <StepperIndicator />
                  {/* Label */}
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </StepperTrigger>
              {step < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>
      </div>
    </div>
  );
};
