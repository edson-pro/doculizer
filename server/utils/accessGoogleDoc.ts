import { google } from "googleapis";
const keyFile = require("../../key.json");

function getGoogleDocIdFromUrl(url) {
  const match = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Invalid Google Doc URL");
  }
}

async function accessGoogleDoc(url) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: keyFile,
      scopes: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.metadata.readonly",
      ],
    });

    const drive = google.drive({ version: "v3", auth });

    // Replace 'DOCUMENT_ID' with the ID of your Google Doc
    const docId = getGoogleDocIdFromUrl(url);

    const docInfo = await drive.files.get({
      fileId: docId,
      fields: "name",
    });

    const response = await drive.files.export({
      fileId: docId,
      mimeType: "text/plain",
      fields: "name",
    });

    return {
      content: response.data,
      title: docInfo.data.name,
    };
  } catch (error) {
    console.error("Error accessing Google Doc:", error);
  }
}

export default accessGoogleDoc;
