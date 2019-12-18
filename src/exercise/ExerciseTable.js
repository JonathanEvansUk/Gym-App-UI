import React from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

const ExerciseTable = props => (
  <Table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Muscle Group</th>
      </tr>
    </thead>
    <tbody>
      {props.exercises.map(exercise => (
        <tr key={exercise.id}>
          <td>{exercise.id}</td>
          <td>{exercise.name}</td>
          <td>{exercise.muscleGroup}</td>
          <td>
            <Link
              to={{
                pathname: exercise.id
              }}
            >
              <Button size="sm">View Exercise</Button>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ExerciseTable;
