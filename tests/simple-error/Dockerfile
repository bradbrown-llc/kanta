FROM denoland/deno:alpine-1.43.1
WORKDIR /jra
COPY . .
WORKDIR /jra/tests/simple-error
RUN deno cache test.ts