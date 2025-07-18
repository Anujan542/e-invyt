import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { renderProgress, renderVideo } from '@/api/customization';
import { CircularProgress } from '@/components/ui/circularProgress';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessPayment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const hasRendered = useRef(false);
  const [renderId, setRenderId] = useState('');
  const [progress, setProgress] = useState<number | null>(null);
  const [videoUrl, setVideoUrl] = useState('');

  const triggerRender = useMutation({
    mutationFn: renderVideo,
    onSuccess: (res) => {
      console.log('first', res.data.message);
      const id = res.data.renderId;
      if (id) {
        setRenderId(id);
      } else if (res.data.message.renderStatus === 'completed') {
        setVideoUrl(res.data.message.videoUrl);
      }
    },
  });

  // Trigger render once on load
  useEffect(() => {
    if (orderId && !hasRendered.current) {
      hasRendered.current = true;
      triggerRender.mutate(orderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // Poll render progress every 5 seconds
  useEffect(() => {
    if (!renderId) return;

    const interval = setInterval(async () => {
      try {
        const res = await renderProgress({ renderId });
        if (res.status === 200) {
          setVideoUrl(res.data.videoUrl);
          setProgress(100);
          clearInterval(interval);
        } else if (res.status === 202) {
          setProgress(Number(res.data.progress));
        } else {
          console.warn('Unexpected render status', res.data);
        }
      } catch (err) {
        console.error('Polling failed', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [renderId]);

  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', 'e-invitation.mp4');

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        {videoUrl === '' && (
          <h1 className="text-4xl text-green-600 font-bold tracking-tighter sm:text-5xl">
            Payment is Success
          </h1>
        )}

        {renderId == '' && <p>Initializing render...</p>}
        {triggerRender.isError && <p className="text-red-500">Render trigger failed!</p>}
        {progress !== null && progress < 100 && (
          <div className="max-w-xs mx-auto w-full flex flex-col items-center">
            <div className="flex items-center gap-1">
              <CircularProgress
                value={progress}
                size={250}
                circleStrokeWidth={10}
                progressStrokeWidth={20}
                showLabel
                labelClassName="text-xl font-bold"
                renderLabel={(progress) => `${progress}%`}
              />
            </div>
          </div>
        )}
        {videoUrl && (
          <div className="mb-4">
            <video
              controls
              className="mx-auto w-full max-w-2xl rounded-xl shadow-lg"
              style={{
                width: 280,
                height: 500,
                borderRadius: '0.75rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Button
              onClick={handleDownload}
              className="mt-4  text-white px-4 py-2 rounded cursor-pointer"
            >
              <Download />
              Download Invitation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPayment;
