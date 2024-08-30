import Link from "next/link";
import { ShopCategory as ShopCategoryInfo } from "~/app/_types/shop-category";

interface ShopCategoryProps
{
    category: ShopCategoryInfo;
}

export const ShopCategory = ({category}: ShopCategoryProps) => {
    return (
        <Link href={"/category/" + category.id} className="flex flex-col items-center">
            <img className="rounded-full overflow-clip w-30 h-30 sm:w-40 sm:h-40" src={category.image}></img>
            <h5 className="text-lg">{category.name}</h5>
        </Link>
    );
};