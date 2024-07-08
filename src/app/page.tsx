// https://www.etsy.com/shop/ragtrader

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { ShopCategory } from "./_components/shop-category";
import { FeaturedShop } from "./_components/featured-shop";

const shopCategories: ShopCategory[] = [
    {
        name: "Jewelry",
        url: "/category/jewelry",
        image: "https://plus.unsplash.com/premium_photo-1661645473770-90d750452fa0?w=200&h=200&fit=crop"
    },
    {
        name: "Clothing",
        url: "/category/clothing",
        image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=200&h=200&fit=crop"
    },
    {
        name: "Interior Decorations",
        url: "/category/interior-decorations",
        image: "https://images.unsplash.com/photo-1708164970111-8ae9a5eed7b1?w=200&h=200&auto=format&fit=crop"
    },
    {
        name: "Garden & Floral",
        url: "/category/garden-and-floral",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop"
    },
    {
        name: "Arts & Crafts",
        url: "/category/arts-and-crafts",
        image: "https://images.unsplash.com/photo-1528938102132-4a9276b8e320?w=200&h=200&fit=crop"
    },
    
    {
        name: "Bags & Backpacks",
        url: "/category/bags-and-backpacks",
        image: "https://plus.unsplash.com/premium_photo-1680373109883-47a3617e9acd?w=200&h=200&fit=crop"
    },
    {
        name: "Bath & Beauty",
        url: "/category/bath-and-beauty",
        image: "https://images.unsplash.com/photo-1454873019514-eae2f086587a?w=200&h=200&fit=crop"
    },
    {
        name: "Books, Movies & Music",
        url: "/category-books-movies-and-music",
        image: "https://plus.unsplash.com/premium_photo-1686314406088-f25c0cf842ff?w=200&h=200&fit=crop"
    },
    {
        name: "Accessories",
        url: "/category/accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop"
    },
    {
        name: "Toys & Games",
        url: "/category/toys-and-games",
        image: "https://plus.unsplash.com/premium_photo-1684623605109-263925d88106?w=200&h=200&fit=crop"
    },
];

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-col gap-16 items-center m-4">
      <section className="grid grid-cols-5 gap-8 justify-center">
        {shopCategories.map (shopCategory => <ShopCategory category={shopCategory} />)}
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

/*
async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
*/