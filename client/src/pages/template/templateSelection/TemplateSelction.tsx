import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

import cinematicThumpnail from './assets/text.png';
import eligantThumbnail from './assets/eligant.png';
import Cinematic from './assets/CinematicLove.mp4';
import Eligant from './assets/EligantBliss.mp4';
import type { TemplateSelectionProps } from './TemplateSelection.types';

// Template data
const templates = [
  {
    id: 't1',
    title: 'Cinematic Love',
    thumbnail: cinematicThumpnail,
    video: Cinematic,
    type: 'wedding',
  },
  {
    id: 't2',
    title: 'Elegant Bliss',
    thumbnail: eligantThumbnail,
    video: Eligant,
    type: 'wedding',
  },
];

export const TemplateSelction = ({
  currentStep,
  setCurrentStep,
  selectedTemplate,
  setSelectedTemplate,
}: TemplateSelectionProps) => {
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalVideo, setModalVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex-1 space-y-10">
      {/* Filter Select */}
      <div className="flex items-center justify-center">
        <Select>
          <SelectTrigger className="w-[170px]">
            <SelectValue placeholder="Filter Templates" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="events">Events</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Template Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.title)}
            className={`group relative w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 ${
              selectedTemplate === template.title
                ? 'border-2 border-blue-500 shadow-xl'
                : 'hover:scale-105 hover:shadow-2xl'
            } cursor-pointer`}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.title}
                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                style={{ aspectRatio: '9/16' }}
              />
              {selectedTemplate === template.title && (
                <CheckCircle className="absolute right-3 top-3 text-blue-500 bg-white rounded-full" />
              )}
            </div>
            <div className="space-y-4 p-6">
              <h3 className="text-xl text-center font-semibold text-card-foreground">
                {template.title}
              </h3>
              <Button
                type="button"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalVideo(template.video);
                }}
              >
                View Sample Preview
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setModalVideo(null)}
        >
          <div
            className="relative max-h-[90vh] w-auto rounded-xl bg-black shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={modalVideo}
              autoPlay
              loop
              controls
              playsInline
              className="max-h-[90vh] w-auto rounded-xl"
              style={{ objectFit: 'contain', aspectRatio: '9/16' }}
            />
            <button
              onClick={() => setModalVideo(null)}
              className="absolute right-4 top-4 text-white text-2xl hover:text-red-400"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Prev step
        </Button>
        <Button
          disabled={!selectedTemplate}
          // variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          // disabled={currentStep > steps.length}
        >
          Next step
        </Button>
      </div>
      {/* <div className="flex items-end justify-end">
        <Button disabled={!selectedId}>Next</Button>
      </div> */}
    </div>
  );
};
