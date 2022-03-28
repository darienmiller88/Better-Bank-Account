# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# copy over both package json files
COPY package*.json ./

# install dependencies
RUN npm install

# Finally, copy over all of the files in the directory to the image
COPY . ./

EXPOSE 3000

# execute the command to run the react app
CMD [ "npm", "start" ]