import { getServerSession } from "next-auth/next"
import { authOptions } from "~/server/auth"
import fs from "fs/promises";
import {db} from "~/server/db";
import {eq} from "drizzle-orm";
import { randomUUID } from "crypto";

export async function POST(request: Request): Promise<Response> {
    const session = await getServerSession(authOptions);
    
    if (!session)
    {
        return Response.json({ success: false, error: "You must be logged in to upload files." });
    }
    
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const limit = 5 * 1_048_576; / * 5MB */

    if (file.size > limit)
    {
        return Response.json({ success: false, error: "Maximum upload size is 5MB." });
    }
    if (file.type !== "image/png" && file.type !== "image/jpeg")
    {
        return Response.json({ success: false, error: "Only png(s) and jpg(s) are supported." });
    }
    
    const target = session.user.id;
    const extension = file.type === "image/png" ? "png" : "jpeg";

    await fs.rm(`./images/${target}.jpg`, { force: true });
    await fs.rm(`./images/${target}.png`, { force: true });
    
    try 
    {
        const data = await file.arrayBuffer();
        await fs.writeFile(`./images/${target}.${extension}`, Buffer.from(data));
        return Response.json({ success: true, url: `/api/images/${target}.${extension}` });
    }
    catch (error)
    {
        console.log(error);
        return Response.json({ success: false, error: "An unknown error occurred, please try again later." });
    }
}