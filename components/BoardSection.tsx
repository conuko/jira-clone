import React, { useState } from "react";
import TaskComponent from "./TaskComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Button, Card, Form, Container } from "react-bootstrap";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTaskModal from "./AddTaskModal";
import { Droppable } from "react-beautiful-dnd";

interface BoardSectionProps {
  title: string;
  tasks: Array<Task>;
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleShow = () => setShowModal(true);

  return (
    <>
      <Col md={3} className="d-flex flex-column p-2">
        <div className="board-sectioin-header d-flex flex-row align-items-center">
          <h3 className="me-auto">{title}</h3>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <Droppable droppableId={title}>
          {(provided) => (
            <Container
              className="p-0 d-flex flex-column h-100"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks &&
                tasks.map((task: Task, index: number) => {
                  return (
                    <TaskComponent
                      title={task.title}
                      description={task.description}
                      id={task.id}
                      key={task.id}
                      boardCategory={title}
                      index={index}
                      userId={task.userId}
                    />
                  );
                })}
              {tasks.length > 0 && (
                <Button className="add-wrapper" onClick={handleShow}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ paddingRight: "10px" }}
                  />
                  Add Task
                </Button>
              )}
              {tasks.length === 0 && (
                <div className="is-empty d-flex flex-column">
                  <Button className="add-wrapper" onClick={handleShow}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ paddingRight: "10px" }}
                    />
                    Add Task
                  </Button>
                </div>
              )}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </Col>
      <AddTaskModal
        showModal={showModal}
        handleClose={handleClose}
        boardCategory={title}
      />
    </>
  );
};

export default BoardSection;
