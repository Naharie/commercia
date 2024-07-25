export default (input: { params: { id: string } }) => {
    return (
        <div className="flex flex-col justify-center items-center text-3xl">
            Shop page for {input.params.id}
        </div>
    );
};