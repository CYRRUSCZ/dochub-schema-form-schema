FROM node:20 as builder
WORKDIR /app
RUN git clone https://github.com/atlassian-labs/json-schema-viewer.git . && \
    npm i && \
    npm run build

FROM node:20
WORKDIR /app
COPY --from=builder /app/build /app

CMD [, ]