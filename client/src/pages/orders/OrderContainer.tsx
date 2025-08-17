import { UseColumns, type Payment } from './Column';
import { DataTable } from './data-table';
import { getOrderDetails } from '@/api/customization';
import { useQuery } from '@tanstack/react-query';

const OrderContainer = () => {
  const columns = UseColumns();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await getOrderDetails();
      return res.data; // return only the data part
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Failed to load orders.</div>;

  return (
    <div className="flex-1 wrapper">
      <DataTable columns={columns} data={data.message as Payment[]} />
    </div>
  );
};

export default OrderContainer;
