### Getting started

Start the envoy docker container

```sh
$ docker build -t envoy/envoy -f ./envoy/envoy.Dockerfile ./envoy
$ docker run -d -p 8080:8080 --network=host envoy/envoy
```

Start the Go GRPC server in /cmd/server

```sh
go run main.go
```

Run the React client

```sh
npm start
```
