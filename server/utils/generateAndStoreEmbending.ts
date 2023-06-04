import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores";
import * as dotenv from "dotenv";
import supabase from "../lib/supabase";
dotenv.config();

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

  console.log("Docs splitted.");

  console.log("Creating vector store...");

  console.log(splitedDocs);
  /* Create the vectorstore */
  // await SupabaseVectorStore.fromDocuments(splitedDocs, new OpenAIEmbeddings(), {
  //   client: supabase,
  //   tableName: "chunks",
  // })
  //   .then((e) => {
  //     console.log("embeding generated success");
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};

export default generateAndStoreEmbending;
