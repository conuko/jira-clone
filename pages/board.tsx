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
  const { data, loading, error } = useQuery(AllTasksQuery, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  return <div>Board</div>;
};

export default Board;
