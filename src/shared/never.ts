export const impossible = (value: never) =>
{
    throw new Error("If you see this message, TypeScript has failed to do its job!");
}