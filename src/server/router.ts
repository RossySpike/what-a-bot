import { IncomingMessage, ServerResponse } from "http";
import { messageUpsert } from "./events/messageUpsert.js";
import { Events } from "../evolution/evolution.dto.js";
import { getInstanceHealth, logToWhatsapp } from "./common.js";

type EndpointCallback = (req: IncomingMessage, res: ServerResponse, body?: any) => void;
type EndpointName = string;
type Endpoints = Record<EndpointName, EndpointCallback>;
export const ROUTES_MAP: Endpoints = {
  "GET:/health": async (req, res) => {

    const response = await getInstanceHealth();
    let body: { data: unknown, status: number, message: string } = { data: await response.json(), status: 200, message: "OK" };
    if (!response.ok) {
      body.status = response.status;
      body.message = response.statusText;
    } else {

      try {

        const logResult = logToWhatsapp(`Health checked`);
        body.message = 'Log sent to whatsapp';
      } catch (error) {

        if (error instanceof Error)
          body.message = error.message;

      }
    }


    const bodyAsString = JSON.stringify(body);
    res.writeHead(body.status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyAsString) })

    res.end(bodyAsString);
  },
  [`POST:/webhook/${Events.toRoute(Events.MESSAGE_UPSERT)}`]: messageUpsert,
}
