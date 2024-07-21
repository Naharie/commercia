import {SearchBar} from "./search-bar";
import ShoppingCart from "../assets/shopping-cart.svg";
import {getServerAuthSession} from "~/server/auth";
import Link from "next/link";

export const Header = async () => {
    const session = await getServerAuthSession();

    return (
        <header className="w-full h-20 py-2 flex flex-row justify-center">
            <div className="w-[70rem] flex flex-col items-center h-full">
                <div
                    className="w-[calc(100%-5rem)] h-full grid grid-cols-[2fr,6fr,1fr,1fr] gap-4 justify-center items-center">
                    <Link href="/" className="text-green-500 text-3xl font-serif">Commercia</Link>
                    <SearchBar width="min-w-[45rem]"/>
                    <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                        {session ? "Sign Out" : "Sign In"}
                    </Link>
                    <Link href="/cart">
                        <img className="w-6 h-6" src={ShoppingCart.src}/>
                    </Link>
                </div>
                <hr className="w-full border-b-[1px] my-2 border-solid border-gray-500"/>
            </div>
        </header>
    );
};