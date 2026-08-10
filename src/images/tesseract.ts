import Tesseract, { createWorker, OEM } from "tesseract.js";
import { type Base64 } from "./types.js";

export async function initTesseract(): Promise<Tesseract.Worker> {
  const worker = await createWorker('spa', OEM.DEFAULT, { logger: (m) => console.log(m), errorHandler: (err) => console.log(err) });
  return worker;

}
// Theres no point in destroying the worker as of this version
// await worker.setParameters({
// })

export async function extractText(data: Base64, worker: Tesseract.Worker): Promise<string> {
  const { data: { text } } = await worker.recognize(Buffer.from(data, "base64"));
  console.log(text);
  if (text.trim() === "")
    throw new Error("No se pudo extraer el texto")
  return text;
}

