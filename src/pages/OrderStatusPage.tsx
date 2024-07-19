import { useGetMyOrders } from '@/api/orderApi'
import OrderStatusDetails from '@/components/OrderStatusDetails';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const OrderStatusPage = () => {
    const { myOrders, isLoading }  = useGetMyOrders();

    if(isLoading) {
        return 'Loading...';
    }

    if(!myOrders || myOrders.length === 0 ) {
        return 'No orders found.';
    }

  return (
    <div className='space-y-10'>
        {myOrders.map((myOrder) => (
            <div className="space-y-10 bg-gray-100 p-10 rounded-xl">
                <OrderStatusHeader order={myOrder} />
                <div className="grid gap-10 md:grid-cols-2">
                    <OrderStatusDetails order={myOrder} />
                    <AspectRatio ratio={16 / 9}>
                    <img src={myOrder.restaurant.imageUrl} alt={myOrder.restaurant.restaurantName} className='rounded-md w-full h-full object-cover' />
                    </AspectRatio>
                </div>
            </div>
        ))}
    </div>
  )
}

export default OrderStatusPage