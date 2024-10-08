import { CartItem } from "@/pages/RestaurantDetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type CartProps = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const RestaurantCartItemCard = ({
  cartItems,
  restaurant,
  removeFromCart,
}: CartProps) => {
  const getTotalCost = () => {
    const totalInCents = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInCents + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <div>
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-green-500 italic flex items-center justify-between">
          <span>Your Total Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>

        <CardContent className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div className="flex justify-between items-center">
              <span>
                <Badge variant="outline" className="mr-2">
                  {item.quantity}
                </Badge>
                {item.name}
              </span>

              <span className="flex items-center gap-1">
                <Trash
                  className="cursor-pointer"
                  color="red"
                  size={20}
                  onClick={() => removeFromCart(item)}
                />
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}
          <Separator />

          <div className="flex justify-between">
            <span>Delivery</span>
            <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
          </div>
          <Separator />
        </CardContent>
      </CardHeader>
    </div>
  );
};

export default RestaurantCartItemCard;
