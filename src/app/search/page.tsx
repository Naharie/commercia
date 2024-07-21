import notFound from "~/app/not-found";

export default ({searchParams}: { searchParams: Record<string, string | string[] | undefined> }) => {
    if (searchParams["q"] == undefined) {
        return notFound();
    }

    const query = searchParams["q"];

    return (
        <div className="flex flex-col justify-center items-center text-3xl">
            You searched for: {query}
        </div>
    );
};