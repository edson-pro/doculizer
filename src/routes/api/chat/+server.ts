import { ConversationalRetrievalQAChain } from "langchain/chains";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import supabase from "@/client/lib/supabase";
import { OPENAI_API_KEY } from "$env/static/private";
import { CallbackManager } from "langchain/callbacks";
import { error } from "@sveltejs/kit";

export async function POST({ request }) {
  const body = await request.json();
  const { question, chat_id, history } = body;

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const model = new OpenAI({
    temperature: 0,
    openAIApiKey: OPENAI_API_KEY,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken: async (token: string) => {
        await writer.ready;
        await writer.write(encoder.encode(`${token}`));
      },
      handleLLMEnd: async () => {
        await writer.ready;
        await writer.write(encoder.encode(`[DONE]`));
        await writer.close();
      },
      handleLLMError: async (e: Error) => {
        await writer.ready;
        await writer.abort(e);
      },
    }),
  });

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    {
      client: supabase,
      tableName: "chunks",
      queryName: "match_documents",
    }
  );
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(1, { chat_id: chat_id })
  );

  try {
    chain
      .call({ question: question, chat_history: history })
      .catch((e) => console.log(e));

    return new Response(stream.readable, {
      headers: {
        "content-type": "text/event-stream",
      },
    });
  } catch (e) {}
}
