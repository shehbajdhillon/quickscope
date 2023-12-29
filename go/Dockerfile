FROM golang:1.21.1-bullseye

WORKDIR /app

COPY . .

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o /quickscope-gql-server server.go

EXPOSE 8080
EXPOSE 5432

ENTRYPOINT [ "/quickscope-gql-server" ]
