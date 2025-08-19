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
import { CheckCircle, Loader2 } from 'lucide-react';

import type { TemplateSelectionProps } from './TemplateSelection.types';
import { useTemplates } from '@/hooks/useTemplate';

export const TemplateSelction = ({
  currentStep,
  setCurrentStep,
  selectedTemplate,
  setSelectedTemplate,
  setTemplateId,
  setTemplatePrice,
  setTemplateDuration,
}: TemplateSelectionProps) => {
  const [modalVideo, setModalVideo] = useState<string | null>();

  const { data: templates, isLoading } = useTemplates();

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
        {isLoading ? (
          <Loader2 />
        ) : (
          templates?.map((template) => (
            <div
              key={template._id}
              onClick={() => {
                setSelectedTemplate(template.name);
                setTemplateId(template._id);
                setTemplatePrice(template.price);
                setTemplateDuration(template.duration);
              }}
              className={`group relative w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 ${
                selectedTemplate === template.name
                  ? 'border-2 border-gray-600 shadow-xl'
                  : 'hover:scale-105 hover:shadow-2xl'
              } cursor-pointer`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={template.thumbnailUrl}
                  alt={template.name}
                  className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  style={{ aspectRatio: '9/16' }}
                />
                {selectedTemplate === template.name && (
                  <CheckCircle className="absolute right-3 top-3 text-red-500 bg-white rounded-full" />
                )}
              </div>
              <div className="space-y-4 p-6">
                <h3 className="text-xl text-center font-semibold text-card-foreground">
                  {template.name}
                </h3>
                <Button
                  type="button"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalVideo(template?.previewVideoUrl);
                  }}
                >
                  View Sample Preview
                </Button>
              </div>
            </div>
          ))
        )}
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
          className="w-32 cursor-pointer"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Prev step
        </Button>
        <Button
          disabled={!selectedTemplate}
          className="w-32 cursor-pointer"
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Next step
        </Button>
      </div>
    </div>
  );
};
