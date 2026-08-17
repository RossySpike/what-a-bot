FROM node:26-alpine
RUN npm install -g pnpm@11.21.0
WORKDIR /app
COPY  package.json pnpm-*.yaml ./
COPY  .env spa.traineddata ./


RUN pnpm install --prod --frozen-lockfile
COPY  dist/ ./dist
RUN chown -R node:node /app

EXPOSE 3000

USER node
CMD ["pnpm", "start"]
