FROM node:16 as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY ./ ./
RUN yarn build

FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html