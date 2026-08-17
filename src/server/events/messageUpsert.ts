import { IncomingMessage, ServerResponse } from "http";
import { TESSERACT_WORKER } from "../../images/tesseract.js";
import { type EvolutionDTO } from "../../evolution/evolution.dto.js";
import { sendPresence } from "../common.js";
import { sendTextMessage } from "../common.js";
import { extractText } from "../../images/tesseract.js";

const JID_WHITELIST = process.env['JID_WHITELIST']!.split(',');
if (JID_WHITELIST === undefined)
  throw new Error('JID_WHITELIST IS UNDEFINED, CHECK YOUR .env')

export async function messageUpsert(req: IncomingMessage, res: ServerResponse, body: EvolutionDTO) {
  const evoRequest = body;


  res.statusCode = 204;
  res.end();
  if (!JID_WHITELIST.includes(evoRequest.data.key.remoteJid) || evoRequest.data.messageType !== "imageMessage") {
    return;
  }
  if (evoRequest.data.message.base64 === undefined)
    return;
  // sendPresence(evoRequest.data.key.remoteJid);
  const text = await extractText(evoRequest.data.message.base64, TESSERACT_WORKER);
  // console.log(text);

  sendTextMessage(evoRequest.data.key.remoteJid, text, { quoted: { key: { id: evoRequest.data.key.id } }, delay: 3000 + Math.ceil(Math.random() * 1000) });

}
