import { Button } from '@/components/ui/button';
import type { ColumnDef } from '@tanstack/react-table';
import { VideoIcon } from 'lucide-react';

export type Payment = {
//   renderId: string;
  amountPaid: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  renderStatus: 'not_started' | 'rendering' | 'completed' | 'failed';
  videoUrl?: string;
  customizationId?: {
    inputs?: {
      groomName?: string;
    };
  };
};

export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: 'renderId',
//     header: 'ID',
//   },
  {
    id: 'groomName',
    header: 'Groom Name',
    cell: ({ row }) => {
      const groomName = row.original.customizationId?.inputs?.groomName;
      return <span>{groomName || <em className="text-gray-400">N/A</em>}</span>;
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
          className="cursor-pointer"
          size={'icon'}
          onClick={() => window.open(videoUrl, '_blank')}
        >
          <VideoIcon />
        </Button>
      ) : (
        <span className="text-gray-400 italic">No Video</span>
      );
    },
  },
];
