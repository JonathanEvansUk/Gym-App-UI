import React from "react";

import { Container, Card, CardHeader, CardBody } from "reactstrap";
import EditWorkoutControls from "./EditWorkoutControls.js";
import ExerciseActivity from "../exerciseActivity/exerciseActivity.js";

const Workout = props => {
  const { workout } = props;

  let dateString = fullDateFormat.format(
    new Date(workout.performedAtTimestampUtc)
  );
  return (
    <Container fluid>
      <Card>
        <CardHeader>
          {dateString}

          <EditWorkoutControls
            deleteWorkout={props.deleteWorkout}
            toggleEditWorkoutModal={props.toggleEditWorkoutModal}
            editWorkoutModal={props.editWorkoutModal}
            newWorkout={props.newWorkout}
            workoutTypes={props.workoutTypes}
            editWorkout={props.editWorkout}
            handleWorkoutTypeEdited={props.handleWorkoutTypeEdited}
            handleWorkoutTimestampEdited={props.handleWorkoutTimestampEdited}
            addExerciseActivityModal={props.addExerciseActivityModal}
            toggleAddExerciseActivityModal={
              props.toggleAddExerciseActivityModal
            }
            addExerciseActivity={props.addExerciseActivity}
          />
        </CardHeader>

        <CardBody>
          {exerciseActivities(workout, props.deleteExerciseActivity)}
        </CardBody>
      </Card>
    </Container>
  );
};

const exerciseActivities = (workout, deleteExerciseActivity) => {
  return workout.exerciseActivities.map(exerciseActivity => {
    return (
      <ExerciseActivity
        key={exerciseActivity.id}
        workoutId={workout.id}
        exerciseActivity={exerciseActivity}
        deleteExerciseActivity={deleteExerciseActivity}
      />
    );
  });
};

const fullDateFormat = Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "2-digit",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});

export default Workout;
