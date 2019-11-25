import React from "react";
import { Button } from "reactstrap";
import AddWorkoutModal from "./AddWorkoutModal";

class AddWorkoutButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAddWorkoutModal = this.toggleAddWorkoutModal.bind(this);
    this.addWorkout = this.addWorkout.bind(this);

    this.state = {};
  }

  toggleAddWorkoutModal() {
    this.props.toggleAddWorkoutModal();
  }

  addWorkout(workoutName, workoutType, workoutTime) {
    this.props.addWorkout(workoutName, workoutType, workoutTime);
  }

  render() {
    return (
      <div className="float-right">
        <Button color="primary" size="sm" onClick={this.toggleAddWorkoutModal}>
          Add Workout
        </Button>
        <AddWorkoutModal
          toggleModal={this.toggleAddWorkoutModal}
          modal={this.props.modal}
          saveWorkout={this.addWorkout}
          workoutTypes={this.props.workoutTypes}
        />
      </div>
    );
  }
}

export default AddWorkoutButton;
