# syntax=docker/dockerfile:1

# First, retrieve the most recent go version from the collection of go Docker images
FROM golang:1.17-alpine

# Afterwards, create the working directory into the image
WORKDIR /app

# Copy over the mod and sum files over into the image before downloading the project dependencies.
COPY go.mod ./
COPY go.sum ./

# Run the go command to download the dependencies.
RUN go mod download

# Copy over the main.go file, as well as the api folder into the /app directory in the image.
COPY main.go ./
COPY /api ./

ENV PORT=8080

# Create the binary needed to run the go program.
RUN go build -o /deploy

EXPOSE 8080

CMD [ "/deploy" ]