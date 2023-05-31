import { json } from "@sveltejs/kit";
import getGoogleDoc from "../../../utils/getGoogleDoc.js";

const getDocument = async ({ type, url }) => {
  if (type === "google-docs") {
    const doc = await getGoogleDoc(url);
    return doc;
  } else if (type === "notion") {
    return {};
  } else if (type === "ms-docs") {
    return {};
  }
};

export async function POST({ request }) {
  const body = await request.json();
  const url = body.url;
  const type = body.type;

  const doc = await getDocument({ url, type });

  return json(doc);
}
