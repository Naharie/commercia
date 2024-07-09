export default (input: { params: { id: string }}) =>
{
    return (
        <div className="flex flex-col justify-center items-center text-3xl">
            Category Page: {input.params.id}
        </div>
    );
};