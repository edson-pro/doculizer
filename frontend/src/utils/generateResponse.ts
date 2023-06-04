import { ConversationalRetrievalQAChain } from "langchain/chains";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import supabase from "@/client/lib/supabase";
import { OPENAI_API_KEY } from "$env/static/private";
import { CallbackManager } from "langchain/callbacks";

const generateResponse = async ({ question, history, chat_id = [] }, send) => {
  try {
    const model = new OpenAI({
      temperature: 0,
      openAIApiKey: OPENAI_API_KEY,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token: string) {
          send(token, "new");
        },
        async handleLLMEnd() {
          send("[DONE]", "end");
        },
        async handleLLMError(e) {
          send(e, "error");
        },
        async handleLLMStart() {
          send("", "start");
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
    console.log({ chat_id: chat_id });
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(1, { chat_id: chat_id })
    );

    await chain
      .call({ question: question, chat_history: history })
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }
};

export default generateResponse;
