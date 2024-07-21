import {useEffect, useState} from "react";
import {ZodType} from "zod";

export const useLocalStorage = <T>(key: string, validator: ZodType<T>, fallback: () => T): [T, (value: T) => void] => {
    const [cache, setCache] = useState<T | undefined>(undefined);

    useEffect(() => {
        const result = validator.safeParse(localStorage.getItem(key));
        setCache(result.success ? result.data : fallback());
    }, []);

    const setter = (updated: T) => {
        setCache(updated);
        localStorage.setItem(key, JSON.stringify(updated));
    };

    return [cache ?? fallback(), setter];
};