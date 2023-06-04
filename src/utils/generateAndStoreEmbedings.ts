import supabase from "@/client/lib/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores";
import { OPENAI_API_KEY } from "$env/static/private";

const generateAndStoreEmbending = async (rawDocs, fields) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 2,
  });
  const docs = await textSplitter.splitDocuments(rawDocs);
  const splitedDocs = docs.map((e) => ({
    ...e,
    metadata: { ...e.metadata, ...fields },
  }));

  await SupabaseVectorStore.fromDocuments(
    splitedDocs,
    new OpenAIEmbeddings({
      openAIApiKey: OPENAI_API_KEY,
    }),
    {
      client: supabase,
      tableName: "chunks",
    }
  )
    .then((e) => {
      console.log("embeding generated success");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default generateAndStoreEmbending;
