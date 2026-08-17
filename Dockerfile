FROM node:26-alpine as base
RUN npm install -g pnpm@11.21.0
WORKDIR /app
COPY  package.json pnpm-*.yaml ./
COPY  .env spa.traineddata ./
RUN pnpm install
EXPOSE 3000

FROM base as development
CMD ["pnpm","dev"]

FROM base as production
RUN pnpm install --prod --frozen-lockfile
COPY  dist/ ./dist
RUN chown -R node:node /app


USER node
CMD ["pnpm", "start"]
