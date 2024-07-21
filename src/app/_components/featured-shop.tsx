import Link from "next/link";

interface FeaturedShopProps {
    shopName: string;
}

interface FeaturedProductProps {

}

const FeaturedProduct = (props: FeaturedProductProps) => {
    return (
        <img className="rounded-md overflow-clip" src="https://placehold.co/200x200"></img>
    );
};

export const FeaturedShop = (props: FeaturedShopProps) => {
    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-1 rounded-md border-solid border-2 border-gray-300 p-1">
                <FeaturedProduct/>
                <FeaturedProduct/>
                <FeaturedProduct/>
                <FeaturedProduct/>
            </div>
            <h5 className="text-xl">See more from <Link className="text-blue-600"
                                                        href={"https://example.com/"}>{props.shopName}</Link></h5>
        </div>
    );
};