import supabase from "@/client/lib/supabase";
import client from "@/lib/client";
import shortid from "shortid";

function getFileType(fileName) {
  const fileExtension = fileName.split(".").pop().toLowerCase();

  switch (fileExtension) {
    case "md":
      return "markdown";
    case "pdf":
      return "pdf";
    case "docx":
      return "docx";
    default:
      return "unknown";
  }
}

function validateFile(file) {
  const allowedExtensions = ["docx", "pdf", "md"];
  const maxSize = 1 * 1024 * 1024;
  if (!file) {
    return "No file selected.";
  }
  const fileNameParts = file.name.split(".");
  const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return "Invalid file type. Allowed types are: DOCX, PDF, Markdown.";
  }
  if (file.size > maxSize) {
    return "File size exceeds the maximum limit of 1MB.";
  }
  return null;
}

const createChat = async ({ file, user }) => {
  const fileError = validateFile(file);
  const fileType = getFileType(file.name);
  if (fileError) {
    throw Error(fileError);
  } else {
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(`/documents/${shortid.generate()}-${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      throw Error(error.message);
    } else {
      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(data.path);

      const chat: any = await client.collection("chats").create({
        user_id: user.id,
        title: file.name,
        type: fileType,
        file: publicUrl,
        pages: 1,
        status: "processing",
      });

      return chat;
    }
  }
};

export default createChat;
