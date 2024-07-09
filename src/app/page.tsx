// https://www.etsy.com/shop/ragtrader

import { ShopCategory } from "./_components/shop-category";
import { FeaturedShop } from "./_components/featured-shop";
import { api } from "~/trpc/server";

export default async function Home() {
  const categories = await api.category.getAll();

  return (
    <main className="flex flex-col gap-16 items-center m-4">
      <section className="grid grid-cols-5 gap-8 justify-center">
        {categories.map (category => <ShopCategory key={category.id} category={category} />)}
      </section>
      <section className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl font-semibold">Checkout these featured shops</h2>
        <div className="grid grid-cols-4 gap-8 justify-center">
          <FeaturedShop shopName="Test" />
          <FeaturedShop shopName="Test" />
          <FeaturedShop shopName="Test" />
          <FeaturedShop shopName="Test" />
        </div>
      </section>
    </main>
  );
}