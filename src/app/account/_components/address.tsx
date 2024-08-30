export const Address = (props: { name: string, lines: string[] }) =>
{
    return (
        <div className="flex flex-col text-lg">
            {
                [ props.name, ...props.lines ].map((line, index) =>
                    <div key={index}>{line}</div>
                )
            }
        </div>  
    );
};