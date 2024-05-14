FROM denoland/deno:alpine-1.43.1
WORKDIR /kanta
COPY . .
WORKDIR /kanta/tests/slipbridge/kanta
RUN deno cache serve.ts