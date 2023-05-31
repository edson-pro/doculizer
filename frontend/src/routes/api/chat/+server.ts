import generateResponse from "@/utils/generateResponse";

export async function POST({ request }) {
  const body = await request.json();

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  await generateResponse(body, async (token, event) => {
    if (event === "new") {
      await writer.ready;
      await writer.write(encoder.encode(`${token}`));
    } else if (event === "end") {
      await writer.ready;
      await writer.write(encoder.encode(`['DONE']`));
      await writer.close();
    } else if (event === "error") {
      await writer.ready;
      await writer.abort(token);
    } else if (event === "start") {
      await writer.ready;
      await writer.write(encoder.encode(``));
    }
  });

  return new Response(stream.readable, {
    headers: {
      "content-type": "text/event-stream",
    },
  });
}
