export interface Address
{
    line1: string,
    line2: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
}

export const formatAddress = (address: Address) =>
{
    const lines = [ address.line1 ];
    
    if (address.line2.trim() !== "")
    {
        lines.push(address.line2);
    }
    
    lines.push(`${address.city}, ${address.state} ${address.postal_code}`);
    lines.push(address.country);
    
    return lines;
};