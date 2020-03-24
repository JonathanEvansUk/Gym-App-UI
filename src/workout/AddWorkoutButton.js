import React from "react";
import { Button } from "reactstrap";
import AddWorkoutModal from "./AddWorkoutModal";

class AddWorkoutButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAddWorkoutModal = this.toggleAddWorkoutModal.bind(this);

    this.state = {};
  }

  toggleAddWorkoutModal() {
    this.props.toggleAddWorkoutModal();
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
          saveWorkout={this.props.addWorkout}
          newWorkout={this.props.newWorkout}
          workoutTypes={this.props.workoutTypes}
          handleWorkoutTypeEdited={this.props.handleNewWorkoutTypeEdited}
          handleWorkoutTimestampEdited={
            this.props.handleNewWorkoutTimestampEdited
          }
        />
      </div>
    );
  }
}

export default AddWorkoutButton;
