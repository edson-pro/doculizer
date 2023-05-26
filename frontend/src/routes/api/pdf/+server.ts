import pdf2html from "pdf2html";

export async function GET() {
  const html = await pdf2html.html(
    `C:/Users/Edson/Documents/doculizer/frontend/static/doc.pdf`
  );

  console.log(html);

  return new Response("number", {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
