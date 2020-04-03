import React from "react";
import WithLoadableEntity from "../WithLoadableEntity.js";
import Workout from "./Workout.js";

class WorkoutFetcher extends React.Component {
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

    this.handleWorkoutTypeEdited = this.handleWorkoutTypeEdited.bind(this);
    this.handleWorkoutTimestampEdited = this.handleWorkoutTimestampEdited.bind(
      this
    );

    this.editWorkout = this.editWorkout.bind(this);
    this.state = {
      workout: undefined,
      loading: true,
      notFound: false,
      addExerciseActivityModal: false,
      editWorkoutModal: false,
      workoutTypes: [],
      newWorkout: {}
    };
  }

  handleFetchWorkoutResponse(response) {
    if (response.status === 200) {
      response.json().then(workout =>
        this.setState({
          workout: workout,
          loading: false,
          newWorkout: {
            workoutType: workout.workoutType,
            performedAtTimestampUtc: workout.performedAtTimestampUtc
          }
        })
      );
    } else if (response.status === 404) {
      this.setState({ loading: false, notFound: true });
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    // TODO these calls should be consolidated
    fetch("http://localhost:8080/workouts/" + id).then(response =>
      this.handleFetchWorkoutResponse(response)
    );

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
    }).then(res => this.props.history.push("/workouts"));
  }

  render() {
    return (
      <WithLoadableEntity
        loading={this.state.loading}
        notFound={this.state.notFound}
        id={this.props.match.params.id}
      >
        <Workout
          workout={this.state.workout}
          deleteWorkout={this.deleteWorkout}
          toggleEditWorkoutModal={this.toggleEditWorkoutModal}
          editWorkoutModal={this.state.editWorkoutModal}
          newWorkout={this.state.newWorkout}
          workoutTypes={this.state.workoutTypes}
          editWorkout={this.editWorkout}
          handleWorkoutTypeEdited={this.handleWorkoutTypeEdited}
          handleWorkoutTimestampEdited={this.handleWorkoutTimestampEdited}
          addExerciseActivityModal={this.state.addExerciseActivityModal}
          toggleAddExerciseActivityModal={this.toggleAddExerciseActivityModal}
          addExerciseActivity={this.addExerciseActivity}
          deleteExerciseActivity={this.deleteExerciseActivity}
        />
      </WithLoadableEntity>
    );
  }
}

export default WorkoutFetcher;
