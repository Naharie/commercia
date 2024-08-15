import {useEffect, useState} from "react";
import {set, ZodType} from "zod";

export const useLocalStorage = <T>(key: string, validator: ZodType<T>, fallback: () => T): [T, (value: T) => void] => {
    const [cache, setCache] = useState<T | undefined>(undefined);
    const setter = (updated: T) => {
        setCache(updated);
        localStorage.setItem(key, JSON.stringify(updated));
    };
    
    if (cache === undefined)
    {
        const result = validator.safeParse(JSON.parse(localStorage.getItem(key) ?? "null"));
        const data = result.success ? result.data : fallback();
        
        setCache(data);
        
        return [data, setter];
    }
    
    return [cache ?? fallback(), setter];
};