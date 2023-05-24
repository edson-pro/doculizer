import { ConversationalRetrievalQAChain } from "langchain/chains";
import supabase from "../lib/supabase";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";

const generateResponse = async ({ input, history = [] }) => {
  const model = new OpenAI({ temperature: 0 });

  const vectorStore = await SupabaseVectorStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    {
      client: supabase,
      tableName: "chunks",
      queryName: "match_documents",
    }
  );
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(1)
  );

  const res = await chain.call({ question: input, chat_history: history });
  return res;
};

export default generateResponse;
