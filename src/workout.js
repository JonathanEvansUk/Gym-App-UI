import React from "react";
import ExerciseActivity from "./exerciseActivity/exerciseActivity.js";
import { Button } from "reactstrap";

import { Card, CardHeader, CardBody } from "reactstrap";
import AddExerciseActivityModal from "./AddExerciseActivityModal.js";

class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.addExerciseActivity = this.addExerciseActivity.bind(this);
    this.addExerciseActivityToWorkout = this.addExerciseActivityToWorkout.bind(
      this
    );

    this.state = {
      loaded: false,
      workout: undefined,
      modal: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch("http://localhost:8080/workouts/" + id)
      .then(res => res.json())
      .then(result => {
        this.setState({
          loaded: true,
          workout: result
        });
      });
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  addExerciseActivity(exercise) {
    fetch(
      "http://localhost:8080/workouts/" +
        this.state.workout.id +
        "/addExerciseActivity",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: exercise.id
      }
    )
      .then(res => res.json())
      .then(exerciseActivity =>
        this.addExerciseActivityToWorkout(exerciseActivity)
      );
  }

  addExerciseActivityToWorkout(newExerciseActivity) {
    let updatedExerciseActivities = this.state.workout.exerciseActivities.slice();
    updatedExerciseActivities.push(newExerciseActivity);

    let updatedWorkout = {
      ...this.state.workout,
      exerciseActivities: updatedExerciseActivities
    };

    this.setState({ workout: updatedWorkout });
  }

  render() {
    const { workout } = this.state;
    if (workout === undefined) {
      return <h1>Loading...</h1>;
    }
    return (
      <Card>
        <CardHeader>
          {workout.name}
          <Button
            color="primary"
            size="sm"
            className="float-right"
            onClick={this.toggleModal}
          >
            Add Exercise Activity
          </Button>
          <AddExerciseActivityModal
            modal={this.state.modal}
            toggleModal={this.toggleModal}
            addExerciseActivity={this.addExerciseActivity}
          />
        </CardHeader>

        <CardBody>{this.renderExerciseActivity(workout)}</CardBody>
      </Card>
    );
  }

  renderExerciseActivity(workout) {
    return workout.exerciseActivities.map((exerciseActivity, index) => {
      return (
        <ExerciseActivity
          key={exerciseActivity.id}
          exerciseActivity={exerciseActivity}
        />
      );
    });
  }
}
export default Workout;
