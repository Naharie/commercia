"use client";

import "react";
import {useState} from "react";
import searchIcon from "../assets/search.svg";
import {useRouter} from "next/navigation";

interface SearchProps {
    className?: string;
}

export const SearchBar = (props: SearchProps) => {
    const [isFocused, setFocused] = useState(false);
    const {push} = useRouter();
    const [query, setQuery] = useState("");
    
    const search = () => {
        const trimmed = query.trim();
        if (trimmed === "") return;
        push(`/search?q=${encodeURIComponent(trimmed)}`);
    };

    return (
        <div
            className={"rounded-full border-2 border-solid border-black min-h-[3.2rem] max-h-[3.2rem] flex flex-row " + (props.className ? props.className : "min-w-[40rem]")}>
            <input
                className="focus:outline-none my-1 ml-3 sm:ml-0 w-[80%] sm:w-[calc(100%-2.5rem)]"
                type="text"
                placeholder="Search for anything"
                value={query}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={event => event.key === "Enter" && search()}
            />

            <img
                className={
                    "text-white bg-green-300 md:ml-4 transition-all " +
                    (isFocused ?
                            "rounded-r-full w-12 h-12 p-1 pr-2 py-2 " :
                            "rounded-full w-10 h-10 p-1 mr-1 my-1"
                    )
                }
                src={searchIcon.src}
                onClick={search}
            />
        </div>
    );
};