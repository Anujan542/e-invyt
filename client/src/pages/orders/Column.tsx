import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export type Payment = {
  amountPaid: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  renderStatus: 'not_started' | 'rendering' | 'completed' | 'failed';
  videoUrl?: string;
  customizationId?: {
    inputs?: {
      groomName?: string;
    };
  };
  createdAt: string;
};

export const UseColumns = (): ColumnDef<Payment>[] => {
  const navigate = useNavigate();
  const currentStep = 3;

  return [
    {
      id: 'groomName',
      header: 'Groom Name',
      cell: ({ row }) => {
        const groomName = row.original.customizationId?.inputs?.groomName;
        return <span>{groomName || <em className="text-gray-400">N/A</em>}</span>;
      },
    },
    {
      id: 'createdAt',
      header: 'Date',
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return <span>{moment(date).format('DD-MM-YYYY')}</span>;
      },
    },
    {
      accessorKey: 'amountPaid',
      header: 'Amount',
    },
    {
      accessorKey: 'status',
      header: 'Payment Status',
    },
    {
      accessorKey: 'renderStatus',
      header: 'Video Status',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const videoUrl = row.original.videoUrl;

        return videoUrl ? (
          <Button
            className="cursor-pointer "
            size={'sm'}
            onClick={() => window.open(videoUrl, '_blank')}
          >
            View Video
          </Button>
        ) : (
          <Button
            className="cursor-pointer bg-green-700 hover:bg-green-600"
            onClick={() =>
              navigate('/template-selection', {
                state: {
                  ...row.original,
                  currentStep,
                },
              })
            }
          >
            Edit Video
          </Button>
        );
      },
    },
  ];
};
