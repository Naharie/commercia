import Link from "next/link";

export default () =>
{
    return (
        <div className="flex min-h-full flex-col items-center justify-center">
            <div className="text-xl mb-4">
                Sorry, but we couldn't find that page.
                <br />
                Maybe try going back to <Link className="text-blue-500" href="/">Commercia</Link>?
                Or search for a product?
            </div>
        </div>
    );
};