"use client";

import { CartProduct, ReactProps } from "@/types";
import { CartItemCard, CartItemCardProps } from "./cart-item-card";
import { useMemo, useState } from "react";

interface Props extends ReactProps {
  cartItems: CartProduct[];
  cartSectionStyle?: React.CSSProperties;
}

export const CartPageComponent = (props: Props) => {
  const initialCardItems = useMemo(
    () =>
      props.cartItems.map((prod) => ({
        price: prod.price,
        productTitle: prod.title,
        id: prod.id.toString(),
      })),
    [props.cartItems]
  );

  const [cardItems, setCardItems] =
    useState<Omit<CartItemCardProps, "actions">[]>(initialCardItems);

  const getTotalPrice = useMemo(
    () => cardItems.reduce((total, item) => (total += item.price), 0),
    [cardItems]
  );

  const onRemove = (id: string) => {
    setCardItems((items) => items.filter((item) => item.id !== id));
  };

  const getRemoveButton = (item: Omit<CartItemCardProps, "actions">) => {
    return (
      <div className="flex justify-end">
        <button
          onClick={() => onRemove(item.id)}
          className="font-bold cursor-pointer p-2 text-sm px-3 py-2 bg-gray-200"
        >
          Remove
        </button>
      </div>
    );
  };

  return (
    <>
      <section className="min-h-96 flex flex-col">
        <header className="flex w-full h-16">
          <div>
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <h2 className="text-sm font-bold py-1">
              Cart contains {cardItems.length} Products.
            </h2>
          </div>
          <div className="ml-auto self-end mr-2 ">
            <h3 className="pb-3 font-bold">
              Total: {`$${getTotalPrice.toFixed(2)}`}
            </h3>
          </div>
        </header>

        {cardItems.length == 0 ? (
          <section className="cart-section h-full ">
            <div className="w-full">
              <p className="mt-24 text-center text-xl font-bold">
                No Items in your Cart currently !
              </p>
              <p className="text-center">Click on Reset Button to restore !</p>
            </div>
          </section>
        ) : (
          <section className="cart-section grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            {cardItems.map((cartItem) => {
              return (
                <CartItemCard
                  key={cartItem.id}
                  {...cartItem}
                  actions={[{ component: () => getRemoveButton(cartItem) }]}
                />
              );
            })}
          </section>
        )}
        <div className="flex-1 w-full"></div>
        <hr className="border-gray-400 pt-4 h-3 mt-auto" />
        <button
          onClick={() => setCardItems(initialCardItems)}
          className="font-bold p-2 text-sm px-4 py-2 bg-gray-200 cursor-pointer w-fit"
        >
          Reset
        </button>
      </section>
    </>
  );
};
