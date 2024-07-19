import { Orders } from "@/types";
import React from "react";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type OrderStatusHeaderProps = {
  order: Orders;
};

const OrderStatusHeader = ({ order }: OrderStatusHeaderProps) => {
  const getExpectedDelvery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const searchOrderStatus = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    ); //higher order functons. Returns an array
  };
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col md:flex-row md:justify-between ">
        <span>
          Order Status:{" "}
          {searchOrderStatus().label}
        </span>
        <span>Expected By: {getExpectedDelvery()}</span>
      </h1>
      <Progress className="animate-pulse mt-4" value={searchOrderStatus().progressValue} />
    </div>
  );
};

export default OrderStatusHeader;
