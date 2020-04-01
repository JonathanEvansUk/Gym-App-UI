import React from "react";
import { Card, CardHeader, CardBody, Badge } from "reactstrap";

const Exercise = ({ exercise }) => {
  return (
    <Card>
      <CardHeader>
        {exercise.name}
        <Badge className="float-right">{exercise.muscleGroup}</Badge>
      </CardHeader>

      <CardBody>{exercise.information}</CardBody>
    </Card>
  );
};

export default Exercise;
