import React from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

const shortDateFormat = Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "2-digit"
});

class WorkoutTable extends React.Component {
  render() {
    return (
      <Table className="mb-0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Workout Type</th>
            <th>Exercises</th>
            <th></th>
          </tr>
        </thead>

        <tbody>{this.renderTableData()}</tbody>
      </Table>
    );
  }

  shouldComponentUpdate(nextProps) {
    return this.props.workouts !== nextProps.workouts;
  }

  renderTableData() {
    return this.props.workouts.map((workout, index) => {
      let dateString = shortDateFormat.format(
        new Date(workout.performedAtTimestampUtc)
      );
      return (
        <tr key={index}>
          <td>{dateString}</td>
          <td>{workout.workoutType}</td>
          <td>{this.renderExercisesList(workout.exerciseActivities)}</td>
          <td>{this.renderWorkoutButton(workout)}</td>
        </tr>
      );
    });
  }

  renderExercisesList(exercises) {
    return exercises.map(exerciseActivity => (
      <li key={exerciseActivity.id}>{exerciseActivity.exercise.name}</li>
    ));
  }

  renderWorkoutButton(workout) {
    return (
      <Link to={"/workouts/" + workout.id}>
        <Button size="sm">View Workout</Button>
      </Link>
    );
  }
}
export default WorkoutTable;
