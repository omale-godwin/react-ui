FROM node:stretch-slim

WORKDIR /mynode/app
COPY package.json //mynode/app
COPY src . /mynode/app/
RUN ["npm", "install"]
EXPOSE 3000
CMD ["npm", "start"] 