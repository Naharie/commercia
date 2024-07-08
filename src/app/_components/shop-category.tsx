import Link from "next/link";

export interface ShopCategory
{
  name: string;
  url: string;
  image: string;
}

interface ShopCategoryProps
{
    category: ShopCategory;
}

export const ShopCategory = ({ category }: ShopCategoryProps) =>
{
    return (
        <Link href={category.url} className="flex flex-col items-center">
                <img className="rounded-full overflow-clip w-40 h-40" src={category.image}></img>
            <h5 className="text-lg">{category.name}</h5>
        </Link>
    );
};