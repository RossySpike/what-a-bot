import { METHODS } from "http";
const EVO_DOMAIN = process.env?.['EVO_DOMAIN'];
const EVO_INSTANCE_NAME = process.env?.['EVO_INSTANCE_NAME'];
const EVO_AUTHENTICATION_API_KEY = process.env?.['EVO_AUTHENTICATION_API_KEY'];
export type Presence = 'available' | 'unavailable' | 'composing' | 'recording';
const LOG_JID = process.env['LOG_JID'];
const EVO_HEADERS = {
  "apikey": EVO_AUTHENTICATION_API_KEY,
  "Content-Type": "application/json"
}
function evoRequestBuilder(inBetween: string, method: string = "POST", body?: any) {


  if (!METHODS.includes(method))
    throw Error("Method asigned is invalid.")

  const options: RequestInit = {
    method: method,
    headers: EVO_HEADERS,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  console.log(body);
  return fetch(`${EVO_DOMAIN}${(inBetween.startsWith('/') ? '' : '/') + inBetween + (inBetween.endsWith('/') ? '' : '/')}${EVO_INSTANCE_NAME}`, options) // Check if failed in order to log it 



}

export function sendPresence(remoteJid: string, presence: Presence = 'composing', delay?: number) {
  return evoRequestBuilder("/chat/sendPresence/", "POST", {
    number: remoteJid,
    delay: delay ?? 3000 + Math.ceil(Math.random() * 1000),
    presence: presence
  })

}
export function sendTextMessage(remoteJid: string, message: string, options?: Object) {

  const body = { number: remoteJid, text: message, ...options };

  return evoRequestBuilder("/message/sendText/", undefined, body);
}
export function getInstanceHealth() {
  return evoRequestBuilder('/instance/connectionState/', 'GET')
}
export function logToWhatsapp(text: string) {
  if (!LOG_JID)
    throw new Error('LOG_JID not found. Skipped');

  return sendTextMessage(LOG_JID, text, { delay: 1200 + Math.ceil(Math.random() * 1000) })
}
