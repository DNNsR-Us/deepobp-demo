# FROM node:13.3.0 AS compile-image
# docker pull stefanscherer/node-windows
# FROM stefanscherer/node-windows AS compile-image
FROM node:12.2.0 AS compile-image

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@9.0.1

# add app
ADD . /app

EXPOSE 4201

# start app
CMD ng serve --host 0.0.0.0 --disableHostCheck