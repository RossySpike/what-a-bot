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

# EVOLUTION

Obtener las instancias creadas:

```bash
DOMINIO=http://localhost:8080 # donde esta montado el servidor
AUTHENTICATION_API_KEY=lo_que_se_pone_en_el_docker
```

Estado de la instancia:

```bash
curl $DOMINIO/instance/connectionState/what-a-bot -H "apikey:"$AUTHENTICATION_API_KEY""
 # {"instance":{"instanceName":"what-a-bot","state":"open"}}
```

```bash
curl "$DOMINIO"/instance/fetchInstances -H "apikey:"$AUTHENTICATION_API_KEY""

curl http://localhost:8080/webhook/find/what-a-bot -H "apikey:"$AUTHENTICATION_API_KEY""
```

devuelve un json y el atributo name es el nombre de la instancia

Se debe habilitar websockets de la instancia
asi como los eventos

No se puede usar websockets porque por ahi no manda el media en formato base64, asi que usare webhooks,
para esto se necesita abrir un endpoint para eso usare `serve` de `node:http`
Para el servidor se necesita

1. Un http.createServer que sera la funcion donde van a parar todas las peticiones
2. Un server.listen que es el encargado de iniciar el servidor

Para trabajar con el servidor de what-a-bot sin ser un contenedor hostname debe ser 0.0.0.0 y el host de evolution apuntar al gateway del bridge de docker

Para crear enums con metodos se puede usar algo como:

```ts
const Name = {
  key:"value"
  method(){
    console.log("hola");
  }
} as const;
// para obtener el tipo
type type = typeof Name[keyof typeof Name];
```

Volver a builder compose

```bash
docker compose up -d --build
```

Ver stdout de contenedor

```bash
docker logs -f $CONTAINER_NAME
#           ^ para enlazarlo a la terminal
```
