export type Concrete<T> = { [K in keyof T]-?: NonNullable<T[K]> };

export const hasProperties = <T>(target: T | undefined | null): target is Concrete<T> =>
{
    if (target == undefined) return false;
    
    for (const key of Object.getOwnPropertyNames(target))
    {
        // This cast is only needed because Object.getOwnPropertyNames isn't typed as strongly as it could be.
        if (target[key as keyof T] == undefined) return false;
    }
    
    return true;
};