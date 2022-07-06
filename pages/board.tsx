import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Row } from "react-bootstrap";
import TaskComponent from "../components/TaskComponent";
import BoardSection from "../components/BoardSection";
import { DragDropContext } from "react-beautiful-dnd";

const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`;

// GraphQL Mutation to create a task on the server
const UpdateTaskMutation = gql`
  mutation UpdateTask(
    $id: String!
    $title: String
    $description: String
    $status: String!
    $userId: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
      userId: $userId
    ) {
      id
      title
      description
      status
    }
  }
`;

const Board = () => {
  const { data, loading, error } = useQuery(AllTasksQuery, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const sections: Array<string> = ["Backlog", "In-Progress", "Review", "Done"];
  const [updateTask] = useMutation(UpdateTaskMutation);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    console.log(result);

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      return;
    }

    updateTask({
      variables: {
        id: draggableId,
        status: destination.droppableId,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project Title</h1>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container d-flex flex-row flex-grow-1">
          {sections.map((section: string, index: number) => {
            let filteredData: Array<Task> = data
              ? data.tasks.filter((task: Task) => {
                  return task.status === section;
                })
              : [];
            return (
              <BoardSection title={section} tasks={filteredData} key={index} />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
