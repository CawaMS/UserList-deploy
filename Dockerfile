FROM alpine:latest
MAINTAINER Esteban Herrera (estebanherrera2@gmail.com

RUN apk add --update nodejs nodejs-npm mongodb
COPY ./ /root/UserList-deploy 
# RUN cd ~/ && npm install
EXPOSE 3000

# CMD ["npm", "run", "~/app.js"]


