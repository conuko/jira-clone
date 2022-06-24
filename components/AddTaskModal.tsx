import React, { useState } from "react";
import { Col, Container, Modal, Card, Form, Button } from "react-bootstrap";
import { gql, useMutation, useQuery } from "@apollo/client";

const AddTaskModal = ({
  showModal,
  handleClose,
}: {
  showModal: boolean;
  handleClose: () => void;
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");

  const handleCreateTask = (e: any) => {
    e.preventDefault();
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
            ></Form.Select>
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
