import React from "react";
import ExerciseActivity from "../exerciseActivity/exerciseActivity.js";
import { Button } from "reactstrap";

import { Card, CardHeader, CardBody } from "reactstrap";
import AddExerciseActivityModal from "../AddExerciseActivityModal.js";
import AddWorkoutModal from "./AddWorkoutModal.js";

class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAddExerciseActivityModal = this.toggleAddExerciseActivityModal.bind(
      this
    );
    this.toggleEditWorkoutModal = this.toggleEditWorkoutModal.bind(this);
    this.addExerciseActivity = this.addExerciseActivity.bind(this);
    this.addExerciseActivityToWorkout = this.addExerciseActivityToWorkout.bind(
      this
    );
    this.deleteExerciseActivity = this.deleteExerciseActivity.bind(this);
    this.removeExerciseActivityFromWorkout = this.removeExerciseActivityFromWorkout.bind(
      this
    );
    this.deleteWorkout = this.deleteWorkout.bind(this);

    this.handleWorkoutNameEdited = this.handleWorkoutNameEdited.bind(this);
    this.handleWorkoutTypeEdited = this.handleWorkoutTypeEdited.bind(this);
    this.handleWorkoutTimestampEdited = this.handleWorkoutTimestampEdited.bind(
      this
    );

    this.editWorkout = this.editWorkout.bind(this);
    this.state = {
      loaded: false,
      workout: undefined,
      addExerciseActivityModal: false,
      editWorkoutModal: false,
      workoutTypes: [],
      newWorkout: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch("http://localhost:8080/workouts/" + id)
      .then(res => res.json())
      .then(result => {
        this.setState({
          loaded: true,
          workout: result,
          newWorkout: {
            workoutName: result.name,
            workoutType: result.workoutType,
            performedAtTimestampUtc: result.performedAtTimestampUtc
          }
        });
      });

    fetch("http://localhost:8080/workoutTypes")
      .then(res => res.json())
      .then(workoutTypes =>
        this.setState({
          workoutTypes: workoutTypes
        })
      );
  }

  toggleAddExerciseActivityModal() {
    this.setState(prevState => ({
      addExerciseActivityModal: !prevState.addExerciseActivityModal
    }));
  }

  toggleEditWorkoutModal() {
    this.setState(prevState => ({
      editWorkoutModal: !prevState.editWorkoutModal
    }));
  }

  handleWorkoutNameEdited(event) {
    event.persist();

    this.setState(prevState => ({
      newWorkout: { ...prevState.newWorkout, workoutName: event.target.value }
    }));
  }

  handleWorkoutTypeEdited(event) {
    event.persist();

    this.setState(prevState => ({
      newWorkout: { ...prevState.newWorkout, workoutType: event.target.value }
    }));
  }

  handleWorkoutTimestampEdited(timestamp) {
    this.setState(prevState => ({
      newWorkout: {
        ...prevState.newWorkout,
        performedAtTimestampUtc: timestamp
      }
    }));
  }

  editWorkout() {
    let editWorkoutRequest = JSON.stringify(this.state.newWorkout);

    console.log(editWorkoutRequest);

    fetch("http://localhost:8080/workouts/" + this.state.workout.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: editWorkoutRequest
    })
      .then(res => res.json())
      .then(workout => this.setState({ workout: workout }));
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

  deleteExerciseActivity(exerciseActivityId) {
    const { id } = this.props.match.params;

    fetch(
      "http://localhost:8080/workouts/" +
        id +
        "/exerciseActivity/" +
        exerciseActivityId,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => res.json())
      //TODO add error handling?
      .then(exerciseActivity =>
        this.removeExerciseActivityFromWorkout(exerciseActivity)
      );
  }

  removeExerciseActivityFromWorkout(deletedExerciseActivity) {
    let updatedExerciseActivities = this.state.workout.exerciseActivities.slice();

    //remove exercise activity
    updatedExerciseActivities = updatedExerciseActivities.filter(
      exerciseActivity => exerciseActivity.id !== deletedExerciseActivity.id
    );

    let updatedWorkout = {
      ...this.state.workout,
      exerciseActivities: updatedExerciseActivities
    };

    this.setState({ workout: updatedWorkout });
  }

  deleteWorkout() {
    const { id } = this.props.match.params;

    fetch("http://localhost:8080/workouts/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then(res => this.props.history.push("/workouts/"));
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
          <div className="float-right">
            <Button
              color="danger"
              size="sm"
              className="mr-2"
              onClick={this.deleteWorkout}
            >
              Delete Workout
            </Button>
            <Button
              size="sm"
              className="mr-2"
              onClick={this.toggleEditWorkoutModal}
            >
              Edit Workout
            </Button>
            <AddWorkoutModal
              modal={this.state.editWorkoutModal}
              toggleModal={this.toggleEditWorkoutModal}
              newWorkout={this.state.newWorkout}
              workoutTypes={this.state.workoutTypes}
              saveWorkout={this.editWorkout}
              handleWorkoutNameEdited={this.handleWorkoutNameEdited}
              handleWorkoutTypeEdited={this.handleWorkoutTypeEdited}
              handleWorkoutTimestampEdited={this.handleWorkoutTimestampEdited}
            />
            <Button
              color="primary"
              size="sm"
              onClick={this.toggleAddExerciseActivityModal}
            >
              Add Exercise Activity
            </Button>
          </div>

          <AddExerciseActivityModal
            modal={this.state.addExerciseActivityModal}
            toggleModal={this.toggleAddExerciseActivityModal}
            addExerciseActivity={this.addExerciseActivity}
          />
        </CardHeader>

        <CardBody>{this.renderExerciseActivity(workout)}</CardBody>
      </Card>
    );
  }

  renderExerciseActivity(workout) {
    return workout.exerciseActivities.map(exerciseActivity => {
      return (
        <ExerciseActivity
          key={exerciseActivity.id}
          workoutId={workout.id}
          exerciseActivity={exerciseActivity}
          deleteExerciseActivity={this.deleteExerciseActivity}
        />
      );
    });
  }
}
export default Workout;
