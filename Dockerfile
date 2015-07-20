# Dockerfile to create a docker image
FROM node:0.12.7-onbuild
MAINTAINER Raincal cyj94228@gmail.com

# Add files to the image
RUN mkdir -p /movie
COPY . /movie
WORKDIR /movie

# Install the dependencies modules
RUN npm install
RUN npm install bower -g
RUN bower install

# Expose the container port
EXPOSE 80

ENTRYPOINT ["node", "app.js"]

