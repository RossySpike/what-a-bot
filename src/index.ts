
import { createServer } from "http";
import { ROUTES_MAP } from "./server/router.js";
import { type EvolutionDTO } from "./evolution/evolution.dto.js";

const PORT = Number(process.env?.['PORT']) || 3000;

const server = createServer((req, res) => {
  // console.log(req.url);
  let body: Array<any> = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    let evoRequest: EvolutionDTO | null = null;
    const rawBody = Buffer.concat(body).toString('utf-8').trim(); // I dont think this would receive something different than json strings so its safe

    if (rawBody.length > 0) {
      try {
        evoRequest = JSON.parse(rawBody) as EvolutionDTO;
      } catch (err) {
        res.statusCode = 400;
        res.statusMessage = 'Bad Request';
        res.end('Invalid JSON');
        return;
      }
    }


    console.log(`${req.method}:${req.url}`)
    const handler = ROUTES_MAP[`${req.method}:${req.url}`];
    console.log("handler: ", handler)
    if (handler) {
      handler(req, res, evoRequest);

    } else {

      res.statusCode = 404;
      res.statusMessage = 'Not Found';
      res.end()
    }
  });


});
server.listen(PORT, () => {
  console.log("servidor prendido papa");
  fetch(`http://localhost:${PORT}/health`)
})
