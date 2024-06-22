import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type MenuItemProps = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const RestaurantMenuItem = ({ menuItem, addToCart }: MenuItemProps) => {
  return (
    <Card
      onClick={addToCart}
      className="cursor-pointer transition-all hover:scale-105 hover:border hover:border-green-600"
    >
      <CardHeader>
        <CardTitle className="italic">{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default RestaurantMenuItem;
