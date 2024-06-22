import { useGetRestaurantById } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import RestaurantCartItemCard from "@/components/RestaurantCartItemCard";
import RestaurantIdInfo from "@/components/RestaurantIdInfo";
import RestaurantMenuItem from "@/components/RestaurantMenuItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-forms/UserProfile";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedItems = sessionStorage.getItem(`cartItem-${restaurantId}`);
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      //1.check if the item is already in the cart
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      ); //return the whole item object

      let updatedCartItems;

      //2.if item is in the cart, update the quantity
      if (existingItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        //3.if item is not in the cart, add it as a new item
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItem-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItem-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = (userFormData: UserFormData) => {
    console.log("user details", userFormData);
  };

  if (isLoading || !restaurant) {
    return <h1>Loading.....</h1>;
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded object-cover h-full w-full"
          alt={` ${restaurant.restaurantName} Image`}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">
          <RestaurantIdInfo restaurant={restaurant} />
          <h3 className="text-2xl font-bold tracking-tight">
            Our Menu
            <span className="text-green-600 text-xl italic">
              (Click on your desired item to select)
            </span>
          </h3>
          {restaurant.menuItems.map((item) => (
            <RestaurantMenuItem
              addToCart={() => addToCart(item)}
              menuItem={item}
            />
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Card>
            <RestaurantCartItemCard
              cartItems={cartItems}
              restaurant={restaurant}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
