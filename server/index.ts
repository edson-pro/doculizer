import supabase from "./lib/supabase";
import generateContent from "./utils/extractors";
import generateAndStoreEmbending from "./utils/generateAndStoreEmbending";
import express from "express";
import generateResponse from "./utils/generateResponse";
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/upload", async (req, res) => {
  const chat = await supabase
    .from("chats")
    .insert({
      user_id: "f00e76e2-df7f-437c-883a-d739af279cb3",
      title: "doc-sample.md",
      type: "markdown",
    })
    .select()
    .single();
  const content = await generateContent("uploads/doc-sample.md", "md");
  await generateAndStoreEmbending(content, { chat_id: 5 });

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
