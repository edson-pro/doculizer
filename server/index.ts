import supabase from "./lib/supabase";
import generateContent from "./utils/extractors";
import generateAndStoreEmbending from "./utils/generateAndStoreEmbending";
import express from "express";
import generateResponse from "./utils/generateResponse";
import accessGoogleDoc from "./utils/accessGoogleDoc";
import fs from "fs";
import shortid from "shortid";
import path from "path";
function getFileNameFromPath(filePath) {
  return path.basename(filePath);
}

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/upload", async (req, res) => {
  const file = {
    name: "Dev contract",
    type: "markdown",
  };
  const filePath = "uploads/doc-sample.md";
  const fsFlie = fs.readFileSync(filePath);

  const fileName =
    "documents/" + shortid.generate() + "-" + getFileNameFromPath(filePath);

  const { data: uploadedFile } = await supabase.storage
    .from("documents")
    .upload(fileName, fsFlie, {
      cacheControl: "3600",
      upsert: false,
    });

  const { data } = supabase.storage
    .from("documents")
    .getPublicUrl(uploadedFile?.path);

  const chat = await supabase
    .from("chats")
    .insert({
      user_id: "f00e76e2-df7f-437c-883a-d739af279cb3",
      title: file.name,
      type: file.type,
      file: data.publicUrl,
    })
    .select()
    .single();

  const content = await generateContent("uploads/doc-sample.md", "markdown");
  await generateAndStoreEmbending(content, { chat_id: 5 });

  res.json({ chat });
});

app.get("/upload-google-doc", async (req, res) => {
  const googleDoc = await accessGoogleDoc(req.body.url);
  const fname = `uploads/${googleDoc.title}.txt`;
  fs.writeFile(fname, googleDoc.content as string, (error) => {
    if (error) {
      console.error("An error occurred while writing to the file:", error);
    } else {
      console.log("Content has been written to the file successfully.");
    }
  });

  const chat = await supabase
    .from("chats")
    .insert({
      user_id: "f00e76e2-df7f-437c-883a-d739af279cb3",
      title: googleDoc.title,
      type: "google-doc",
      file: req.body.url,
    })
    .select()
    .single();

  const content = await generateContent(fname, "txt");

  await generateAndStoreEmbending(content, { chat_id: chat.data.id });

  res.json({ chat });
});

app.get("/chats/:id/ask", async (req, res) => {
  const { input } = req.body;
  const response = await generateResponse({
    input: input,
  });
  res.json({ ...response });
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
