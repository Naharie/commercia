import {ShopCategory} from "./_components/shop-category";
import {FeaturedShop} from "./_components/featured-shop";
import {api} from "~/trpc/server";

export default async function Home() {
    const categories = await api.category.getCategories();
    const featuredShops = await api.shop.getFeaturedShops();
    
    return (
        <main className="flex flex-col gap-16 items-center m-4 pb-8">
            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center">
                {categories.map(category => <ShopCategory key={category.id} category={category}/>)}
            </section>
            {featuredShops.length > 0 &&
                <section className="flex flex-col gap-8 items-center">
                    <h2 className="text-2xl font-semibold">Checkout these featured shops</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 justify-center">
                        {featuredShops.map(shop =>
                            <FeaturedShop key={shop.id} id={shop.id} name={shop.name} />
                        )}
                    </div>
                </section>
            }
        </main>
    );
}