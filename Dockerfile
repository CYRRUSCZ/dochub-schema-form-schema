FROM python:3-bookworm AS builder
WORKDIR /app
COPY ./ .
RUN pip install json-schema-for-humans && \
    mkdir -p ./dist && \
    generate-schema-doc ./schema/form.schema.json ./dist

FROM node:20
WORKDIR /app
COPY ./server /app
COPY --from=builder /app/dist /app/public
RUN npm i

CMD ["npm", "run", "dev"]