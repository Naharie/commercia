import {ChangeEvent} from "react";
import {reporter} from "next/dist/trace/report";

export const FileUpload = ({ reportError, onUpload } : { reportError: (error: string) => void, onUpload: (url: string) => void }) =>
{
    const handleUpload = async (event: ChangeEvent<HTMLInputElement>) =>
    {
        if (!event.target.files || event.target.files.length != 1) return;
        
        const files = event.target.files;
        const file = files.item(0);
        
        if (file === null) return;

        const limit = 5 * 1_048_576; / * 5MB */
        
        if (file.size > limit)
        {
            reportError("Maximum upload size is 5MB.");
            return;
        }
        if (file.type !== "image/png" && file.type !== "image/jpeg")
        {
            reportError("Only png(s) and jpg(s) are supported.");
            return;
        }
        
        const data = new FormData();
        data.append("file", file);
        
        const result: { success: true, url: string } | { success: false, error: string } = await fetch("/api/images", {
            method: "POST",
            body: data
        }).then(res => res.json());
        
        if (!result.success)
        {
            reportError(result.error);
        }
        else
        {
            onUpload(result.url);
        }
    };
    
    return (
        <input type="file" accept="image/png, image/jpeg" onChange={handleUpload} />
    )
}