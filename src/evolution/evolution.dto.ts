import type { Base64 } from "../images/types.js";

export const Events = {
  MESSAGE_UPSERT: "messages.upsert",
  toRoute(event: string) {

    return event.replace(/\./g, "-");
  }
} as const;
interface MessageData {
  key: { remoteJid: string, id: string, fromMe: boolean };
  message: { base64: Base64, conversation: string };
  messageType: string;

}
export type Event = typeof Events[keyof typeof Events];
export interface EvolutionDTO {
  event: Event
  instance: string;
  data: MessageData;
}
