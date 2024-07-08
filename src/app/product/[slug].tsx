export default (slug: string) =>
{
    return (
        <div className="flex flex-col justify-center items-center text-3xl">
            Item Page: {slug}
        </div>
    );
};