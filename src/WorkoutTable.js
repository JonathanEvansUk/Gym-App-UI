import React from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

class WorkoutTable extends React.Component {
  render() {
    console.log(this.props.workouts);
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Workout Type</th>
            <th>Exercises</th>
            <th></th>
          </tr>
        </thead>

        <tbody>{this.renderTableData()}</tbody>
      </Table>
    );
  }

  renderTableData() {
    return this.props.workouts.map((workout, index) => {
      return (
        <tr key={index}>
          <td>{workout.name}</td>
          <td>{workout.workoutType}</td>
          <td>{this.renderExercisesList(workout.exerciseActivities)}</td>
          <td>{this.renderWorkoutButton(workout)}</td>
        </tr>
      );
    });
  }

  renderExercisesList(exercises) {
    return exercises.map(exerciseActivity => (
      <li key={exerciseActivity.exercise.name}>
        {exerciseActivity.exercise.name}
      </li>
    ));
  }

  renderWorkoutButton(workout) {
    return (
      <Link
        to={{
          pathname: workout.id
        }}
      >
        <Button>View Workout</Button>
      </Link>
    );
  }
}
export default WorkoutTable;
