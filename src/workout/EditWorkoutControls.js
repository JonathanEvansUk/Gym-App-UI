import React from "react";
import AddExerciseActivityModal from "../AddExerciseActivityModal.js";
import AddWorkoutModal from "./AddWorkoutModal.js";
import { Button } from "reactstrap";

const EditWorkoutControls = props => (
  <div className="float-right">
    <Button
      color="danger"
      size="sm"
      className="mr-2"
      onClick={props.deleteWorkout}
    >
      Delete Workout
    </Button>
    <Button size="sm" className="mr-2" onClick={props.toggleEditWorkoutModal}>
      Edit Workout
    </Button>
    <AddWorkoutModal
      modal={props.editWorkoutModal}
      toggleModal={props.toggleEditWorkoutModal}
      newWorkout={props.newWorkout}
      workoutTypes={props.workoutTypes}
      saveWorkout={props.editWorkout}
      handleWorkoutTypeEdited={props.handleWorkoutTypeEdited}
      handleWorkoutTimestampEdited={props.handleWorkoutTimestampEdited}
    />
    <Button
      color="primary"
      size="sm"
      onClick={props.toggleAddExerciseActivityModal}
    >
      Add Exercise Activity
    </Button>
    <AddExerciseActivityModal
      modal={props.addExerciseActivityModal}
      toggleModal={props.toggleAddExerciseActivityModal}
      addExerciseActivity={props.addExerciseActivity}
    />
  </div>
);

export default EditWorkoutControls;
