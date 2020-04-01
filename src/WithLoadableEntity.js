import React from "react";

const WithLoadableEntity = props => {
  if (props.loading) {
    return <h1>Loading...</h1>;
  }

  if (props.notFound) {
    return <h1>No workout found for id: {props.id}</h1>;
  }

  return props.children;
};

export default WithLoadableEntity;
