FROM denoland/deno:alpine-1.43.1
WORKDIR /kanta
COPY . .
RUN deno cache serve.ts