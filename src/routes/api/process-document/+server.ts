import extractContent from "@/utils/extractContent.js";
import generateAndStoreEmbending from "@/utils/generateAndStoreEmbedings.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const body = await request.json();

  const content = await extractContent({ url: body.url, type: body.type });

  await generateAndStoreEmbending(content, { chat_id: body.chat_id });

  return json({ message: "done" });
}
