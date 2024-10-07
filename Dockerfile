FROM python:3-bookworm AS schemaBuilder
WORKDIR /app
COPY ./ .
RUN pip install json-schema-for-humans && \
    mkdir -p ./dist && \
    generate-schema-doc \
        --config minify=false \
        --config deprecated_from_description=true \
        --config collapse_long_descriptions=false \
        --config collapse_long_examples=false \
        ./schema \
        ./dist

FROM node:20 AS builder
WORKDIR /app
COPY ./server /app
COPY --from=schemaBuilder /app/dist /app/public
RUN npm ci && npm run build

FROM node:20
WORKDIR /app
COPY --from=builder /app /app
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.js"]