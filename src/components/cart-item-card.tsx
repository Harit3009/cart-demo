import * as React from "react";
import { ReactProps } from "../types";

export interface CartItemCardProps extends ReactProps {
  productTitle: string;
  price: number;
  id: string;
  actions: { component: () => React.ReactElement }[];
}

export const CartItemCard = (props: CartItemCardProps) => {
  return (
    <div className="flex flex-col border-black border-1 rounded-md flex-1 p-2 h-32">
      <h1 className="font-bold text-xl line-clamp-1">{props.productTitle}</h1>
      <h6 className="text-sm">${props.price}</h6>
      <div className="flex-1"></div>

      {props.actions.map((act, i) => {
        return <act.component key={i} />;
      })}
    </div>
  );
};
