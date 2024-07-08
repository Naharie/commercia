"use client";

import { useState } from "react";
import searchIcon from "../assets/search.svg";

interface SearchProps
{
    width?: string;
}

export const SearchBar = (props: SearchProps) =>
{
    const [isFocused, setFocused] = useState(false);

    return (
        <div className={"rounded-full border-2 border-solid border-black min-h-[3.2rem] max-h-[3.2rem] flex flex-row pl-4 " + (props.width ? props.width : "min-w-[40rem]")}>
            <input
                className="focus:outline-none my-1 w-[calc(100%-2.5rem)]"
                type="text"
                placeholder="Search for anything"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            
            <img className={
                "text-white bg-green-300 ml-4 transition-all " +
                (isFocused ?
                    "rounded-r-full w-12 h-12 p-1 pr-2 py-2 " :
                    "rounded-full w-10 h-10 p-1 mr-1 my-1"
                )
            } src={searchIcon.src}></img>
        </div>
    );
};