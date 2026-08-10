# Tesseract
[API](https://github.com/naptha/tesseract.js/blob/master/docs/api.md)
Al parecer para usarlo se necesita:
1. Entrada (ruta)
2. createWorker: un objeto con metodo recognize (async) que devuelve un objeto con un field data que guarda las distintas operaciones realizadas al llamar al metodo
3. Finalizar el worker con worker.terminate(); (async)

Por ahora visualizo una cola de mensajes que se van procesando en orden 
segun [los formatos soportados](https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md) para `Node` hay:
- string con path a una imagen local
- string en base64
- buffer

Como la api de evolution puede generar una base64 usare esta
