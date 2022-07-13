import React, { useState } from "react";
import { Col, Container, Modal, Card, Form, Button } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";

// GraphQL Mutation to create a task on the server
const CreateTaskMutation = gql`
  mutation CreateTask(
    $id: String
    $title: String!
    $description: String!
    $status: String!
    $userId: String
  ) {
    createTask(
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

const AllUsersQuery = gql`
  query {
    users {
      id
      name
    }
  }
`;

const AddTaskModal = ({
  showModal,
  handleClose,
  boardCategory,
}: {
  boardCategory: String;
  showModal: boolean;
  handleClose: () => void;
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");

  const [createTask, { data, loading, error }] = useMutation(
    CreateTaskMutation,
    {
      onCompleted: (data) => {
        setTaskTitle("");
        setTaskDescription("");
        setAssignTo("");
      },
    }
  );

  const { data: usersData, loading: usersLoading } = useQuery(AllUsersQuery);

  const handleCreateTask = (e: any) => {
    e.preventDefault();

    let userId = "";

    // if a task is not assigned to a user manually, assign it to the first user on the list
    if (assignTo) {
      userId = assignTo;
    } else if (usersData) {
      userId = usersData.users[0].id;
    }

    createTask({
      variables: {
        title: taskTitle,
        description: taskDescription,
        status: boardCategory,
        userId: userId,
      },
    });
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCreateTask}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assign To</Form.Label>
            <Form.Select
              value={assignTo}
              onChange={(e) => {
                setAssignTo(e.target.value);
              }}
            >
              {usersData &&
                usersData.users.map((user: User) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
