import { Orders, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrderStatus } from "@/api/myRestaurantApi";
import { useEffect, useState } from "react";

type OrderItemCardProps = {
  item: Orders;
};

const OrderItemCard = ({ item }: OrderItemCardProps) => {
  const { updateStatus, isLoading } = useUpdateMyRestaurantOrderStatus();
  const [theStatus, setTheStatus] = useState<OrderStatus>(item.status);

  const statusUpdate = async (newStatus: OrderStatus) => {
    await updateStatus({ orderId: item._id as string, status: newStatus });
    setTheStatus(newStatus);
  };


  useEffect(() => {
    setTheStatus(item.status);
  }, [item.status])
  const getTime = () => {
    const orderDateTime = new Date(item.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4  mb-3 ">
          <div>
            Customer Name:
            <span className="ml-2 font-bold"> {item.deliveryDetails.name}</span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-bold">
              {" "}
              {item.deliveryDetails.addressLine1}, {item.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-bold"> {getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-bold">
              {" "}
              ${(item.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {item.cartItems.map((cartItem) => (
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={theStatus}
            disabled={isLoading}
            onValueChange={(value) => statusUpdate(value as OrderStatus)}
          >
            <SelectTrigger className="w-full" id="status">
              <SelectValue placeholder="Select delivery status" />
            </SelectTrigger> 
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value} className="">
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
