import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

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
  return <div>Board</div>;
};

export default Board;
