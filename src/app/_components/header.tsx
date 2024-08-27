import {SearchBar} from "./search-bar";
import {getServerAuthSession} from "~/server/auth";
import Link from "next/link";

import ShoppingCart from "../assets/shopping-cart.svg";
import User from "../assets/user.svg";

export const Header = async () => {
    const session = await getServerAuthSession();

    return (
        <header className="w-full py-2 flex flex-row justify-center">
            <div className="max-w-[70rem] flex flex-col items-center h-full">
                <div
                    // The two grid cols must be specified in full so tailwind notices and generates the class. 
                    className={`p-1 sm:p-0 w-full sm:w-[95%] md:w-[calc(100%-5rem)] h-full grid ${
                        session ?
                            "grid-cols-1 sm:grid-cols-[1fr,6fr,1fr,0.5fr,0.5fr] md:grid-cols-[2fr,6fr,1.25fr,0.5fr,0.5fr]" :
                            "grid-cols-1 sm:grid-cols-[1fr,4fr,0.5fr,0.5fr] md:grid-cols-[2fr,6fr,0.5fr,0.5fr]"
                    } gap-4 justify-center items-center`}
                >
                    <Link href="/" className="text-green-500 text-3xl font-serif">Commercia</Link>
                    <SearchBar className="hidden sm:flex pl-4 w-full"/>
                    <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                        {session ? "Sign Out" : "Sign In"}
                    </Link>
                    <Link href="/cart">
                        <img className="w-6 h-6" src={ShoppingCart.src} alt="Black icon of a shopping cart."/>
                    </Link>
                    {session &&
                        <Link href="/account">
                            <img className="w-6 h-6" src={User.src} alt="Generic black icon of a human from the torso up." />
                        </Link>
                    }

                    <SearchBar className="sm:hidden w-full col-span-4"/>
                </div>
                <hr className="w-full border-b-[1px] my-2 border-solid border-gray-500"/>
            </div>
        </header>
    );
};