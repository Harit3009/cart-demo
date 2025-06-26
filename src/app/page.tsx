import { getCart } from "@/api/Cart/getCarItems";
import { CartItemCard } from "@/components/cart-item-card";
import { CartPageComponent } from "@/components/cart-page";

export default async function Home() {
  const cartItems = await getCart();

  if (!cartItems)
    return (
      <div className="flex justify-center">
        <span>404</span>
      </div>
    );

  return (
    <main className="bg-white ">
      <CartPageComponent cartItems={cartItems.products} />
    </main>
  );
}
