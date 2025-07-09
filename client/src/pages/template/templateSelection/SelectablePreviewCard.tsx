import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react'; // install `lucide-react` if not using yet
import { Button } from '@/components/ui/button';

type Props = {
  id: string;
  title: string;
  thumbnail: string;
  video: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

export const SelectablePreviewCard: React.FC<Props> = ({
  id,
  title,
  thumbnail,
  video,
  selected,
  onSelect,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => onSelect(id)}
        className={`relative w-full max-w-[220px] overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
          selected ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-gray-300'
        }`}
      >
        <div className="relative aspect-[9/16] overflow-hidden bg-gray-100">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {selected && (
            <CheckCircle className="absolute right-2 top-2 text-blue-500 bg-white rounded-full" size={24} />
          )}
        </div>
        <div className="p-3 text-center">
          <h4 className="text-sm font-semibold">{title}</h4>
          <Button
            type="button"
            className="mt-2 w-full"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            View Preview
          </Button>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-auto rounded-xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={video}
              autoPlay
              muted
              loop
              controls
              playsInline
              className="max-h-[90vh] w-auto rounded-xl"
              style={{ objectFit: 'contain', aspectRatio: '9/16' }}
            />
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-white text-3xl font-bold hover:text-red-400"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};
