import supabase from "@/client/lib/supabase";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores";

const generateAndStoreEmbending = async (rawDocs, fields) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 8000,
    chunkOverlap: 100,
  });
  const docs = await textSplitter.splitDocuments(rawDocs);
  const splitedDocs = docs.map((e) => ({
    ...e,
    metadata: { ...e.metadata, ...fields },
  }));

  await SupabaseVectorStore.fromDocuments(splitedDocs, new OpenAIEmbeddings(), {
    client: supabase,
    tableName: "chunks",
  })
    .then((e) => {
      console.log("embeding generated success");
    })
    .catch((e) => {
      console.log(e);
    });
};

export default generateAndStoreEmbending;
