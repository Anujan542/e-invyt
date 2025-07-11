/* eslint-disable @typescript-eslint/no-explicit-any */
import { payHere } from '@/api/customization';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const PayHereButton = () => {
  const customizationId = '686fd7c83b4ae53b5a1b60b5';

  const payHereMutation = useMutation({
    mutationFn: payHere,
  });

  const handlePayNow = async () => {
    try {
      const res = await payHereMutation.mutateAsync({ customizationId });

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
  };

  return (
    <button
      onClick={handlePayNow}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay Now
    </button>
  );
};

export default PayHereButton;
