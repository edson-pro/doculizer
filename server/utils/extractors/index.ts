import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import fs from "fs";

function LoadByType(pathName, type) {
  switch (type) {
    case "docx":
      const doxcxLoader = new DocxLoader(pathName);
      return doxcxLoader.load();
    case "pdf":
      const pdfLoader = new PDFLoader(pathName, {
        pdfjs: () => import("pdfjs-dist/legacy/build/pdf.js"),
      });
      return pdfLoader.load();
    case "markdown":
      const markdown = fs.readFileSync(pathName, "utf-8");
      const splitter: any = new MarkdownTextSplitter();
      return splitter.createDocuments([markdown]);
    case "website":
      const loader = new CheerioWebBaseLoader(pathName, {
        selector: "article",
      });
      return loader.load();
    case "txt":
      const textLoader = new TextLoader(pathName);
      return textLoader.load();
    default:
      return "";
  }
}

const generateContent = (path, type) => {
  const content = LoadByType(path, type);
  fs.unlink(path, (error) => {
    if (error) {
      console.error("An error occurred while deleting the file:", error);
    } else {
      console.log("File has been deleted successfully.");
    }
  });
  return content;
};

export default generateContent;
