import {z} from "zod";
import {useLocalStorage} from "~/app/_hooks/useLocalStorage";

const cartValidator = z.array(z.number().int());

export const useCart = () =>
{
    return useLocalStorage("cart", cartValidator, () => []);
};