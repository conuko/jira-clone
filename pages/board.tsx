import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Row } from "react-bootstrap";

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

const Board = () => {
  const { data, loading, error } = useQuery(AllTasksQuery, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  return (
    <div className="pt-3 h-100 d-flex flex-column">
      <Row>
        <h1>Project Title</h1>
      </Row>
      <div className="board-container">
        {data &&
          data.tasks.map((task) => {
            return <div key={task.title}>{task.title}</div>;
          })}
      </div>
      Board
    </div>
  );
};

export default Board;
