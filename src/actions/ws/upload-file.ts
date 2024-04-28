// "use server";
import axios from "axios";

export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("image", file);

  const ret = await axios
    .post(
      `https://api.imgbb.com/1/upload?key=07a81a37995f5169c69440a43582b7a6`,

      body
    )
    .catch(() => {
      throw new Error("Fail to upload file");
    });
  return (await ret.data).data.url as string;
}
