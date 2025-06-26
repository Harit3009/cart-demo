import { CartResponse } from "@/types";
type Response = {
  carts: CartResponse[];
};

export const getCart = async (): Promise<CartResponse | undefined> => {
  return fetch("https://dummyjson.com/carts")
    .then((r) => r.json())
    .then((data: Response) => data.carts.find((c) => c.products.length > 5)!);
};
