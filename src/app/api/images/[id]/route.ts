import {readFile} from "fs/promises";

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        // Drop any "unfortunate" or "interesting" character combinations from the path.
        const imageId = context.params.id.split("..").join("").split("/").join("").split("\\").join("");
        const data = await readFile(`./images/${imageId}`);

        return new Response(data);
    } catch (error) {
        console.log(error);
        return new Response("404 - Asset not found", {
            status: 404,
            statusText: "NOT FOUND"
        });
    }
}