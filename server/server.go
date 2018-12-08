/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

//go:generate protoc -I ../proto --go_out=plugins=grpc:../proto ../proto/todo.proto

package main

import (
	"context"
	"fmt"
	"google.golang.org/grpc"
	"log"
	"net"
	"time"
	pb "todo/proto"
)

const (
	port = ":9090"
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	data []*pb.Task
}

// SayHello implements helloworld.GreeterServer
//func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
//	return &pb.HelloReply{Message: "Hello " + in.Name + "!!"}, nil
//}

//func (s *server) ListTasks(ctx context.Context, in *pb.TaskRequest) (*pb.TaskResponse, error) {
func (s *server) ListTasks(ctx context.Context, in *pb.Empty) (*pb.TaskResponse, error) {

	fmt.Println("New Request: ListTasks")
	//time.Sleep(1 * time.Second)
	fmt.Println("ListTasks: Complete!")

	return &pb.TaskResponse{Tasks: s.data}, nil
}

func (s *server) NewTask(ctx context.Context, in *pb.Task) (*pb.Empty, error) {

	fmt.Println("New Request: NewTask")

	time.Sleep(3 * time.Second)

	data := []*pb.Task{
		{Message: in.Message, Uuid: in.Uuid},
		//{Message: "testing5", Id: 5},
		//{Message: "testing6", Id: 6},
	}
	s.data = append(s.data, data...)

	fmt.Println("NewTask Response:", data)

	return &pb.Empty{}, nil
}

func (s *server) RemoveTask(ctx context.Context, request *pb.RemoveTaskRequest) (*pb.Empty, error) {
	return &pb.Empty{}, nil
}

func main() {

	data := []*pb.Task{
		{Message: "testing1", Uuid: "5355507d-84e1-49dd-8200-7f64d8744698"},
		{Message: "testing2", Uuid: "9c8b613d-f2ff-453c-a522-217de81ccdf9"},
		{Message: "testing3", Uuid: "e4cda2ea-5c95-4dde-b3b7-706f746f598e"},
	}

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterTodoServer(s, &server{data: data})

	fmt.Println("Listening...")

	// Register reflection service on gRPC server.
	// reflection.Register(s)

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

//t0 := &pb.Task{Message: "testing1", Id: 1}
//t1 := &pb.Task{Message: "testing2", Id: 2}
//t2 := &pb.Task{Message: "testing3", Id: 3}
//
//fmt.Println(t2)
//
//data = append(data, t0)
//data = append(data, t1)
//data = append(data, t2)

//t := &[]pb.Task{}
//
//for i := 0; i < 5; i++ {
//	tasking := &pb.Task{Message: "Task"}
//	t := append(*t, *tasking)
//}
//
////t2 := *pb.Task{}
//
//return &pb.TaskList{Tasks: []*pb.Task{Message: t}}, nil
