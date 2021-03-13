FROM node:15.11.0 as build-stage

WORKDIR /app


COPY package*.json ./

RUN npm install


# Bundle app source
COPY ./ /app/

RUN npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html 
