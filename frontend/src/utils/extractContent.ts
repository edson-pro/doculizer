import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

async function LoadByType({ path, type }) {
  switch (type) {
    case "docx":
      const docx = await fetch(path).then((response) => response.blob());
      const doxcxLoader = new DocxLoader(docx);
      return doxcxLoader.load();
    case "pdf":
      const pdf = await fetch(path).then((response) => response.blob());
      const pdfLoader = new PDFLoader(pdf, {
        pdfjs: () => import("pdfjs-dist/legacy/build/pdf.js"),
      });
      return pdfLoader.load();
    case "markdown":
      const markdown = await fetch(path).then((response) => response.text());
      const splitter: any = new MarkdownTextSplitter();
      return splitter.createDocuments([markdown]);
    case "website":
      const loader = new CheerioWebBaseLoader(path, {
        selector: "article",
      });
      return loader.load();
    case "txt":
      const txt = await fetch(path).then((response) => response.blob());
      const textLoader = new TextLoader(txt);
      return textLoader.load();
    default:
      return "";
  }
}

const extractContent = async ({ url, type }) => {
  const content = await LoadByType({ path: url, type });
  return content;
};

export default extractContent;
