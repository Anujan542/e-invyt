import { renderVideo } from '@/api/customization';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const SuccessPayment = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  const hasRendered = useRef(false);

  const triggerRender = useMutation({
    mutationFn: renderVideo,
  });

  useEffect(() => {
    if (orderId && !hasRendered.current) {
      hasRendered.current = true;
      triggerRender.mutate(orderId);
    }
  }, [orderId]);

  return (
    <div>
      <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl text-green-600 font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
              Payment is success
            </h1>
            {triggerRender.isPending && <p>Rendering your invitation...</p>}
            {triggerRender.isError && <p>Something went wrong.</p>}
            {triggerRender.isSuccess && <p>Render started successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
