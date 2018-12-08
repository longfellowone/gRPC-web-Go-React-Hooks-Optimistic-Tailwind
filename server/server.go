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

type server struct {
	data []*pb.Task
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

func (s *server) RemoveTask(ctx context.Context, in *pb.RemoveTaskRequest) (*pb.Empty, error) {

	for i := range s.data {
		if s.data[i].Uuid == in.Uuid {
			copy(s.data[i:], s.data[i+1:])
			s.data[len(s.data)-1] = nil
			s.data = s.data[:len(s.data)-1]
			break
		}
	}

	fmt.Println("Deleted task UUID: ", in.Uuid)

	return &pb.Empty{}, nil
}
