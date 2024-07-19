import { Orders } from "@/types";
import { Separator } from "./ui/separator";

type OrderStatusDetailsProps = {
  order: Orders;
};

const OrderStatusDetails = ({ order }: OrderStatusDetailsProps) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering To: </span>
        <span className="">{order.deliveryDetails.name}</span>
        <span>
          {" "}
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}{" "}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
            {order.cartItems.map((item) => (
                <li>{item.name}, Quantity: {item.quantity}</li>
            ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">
            Total
        </span>
        <span>${(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetails;
