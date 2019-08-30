import React from "react";
import ExerciseActivity from "./exerciseActivity.js";

import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Collapse,
  Col
} from "reactstrap";

class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    let cardsCollapsedState = new Array(
      this.props.location.state.workout.length
    ).fill(false);

    this.state = { collapse: cardsCollapsedState };
  }

  toggle(id) {
    const updatedCollapses = this.state.collapse.slice();
    updatedCollapses[id] = !updatedCollapses[id];

    this.setState({
      collapse: updatedCollapses
    });
  }

  render() {
    const { workout } = this.props.location.state;
    return (
      <Card>
        <CardHeader>{workout.name}</CardHeader>

        <CardBody>{this.renderExerciseActivity(workout)}</CardBody>
      </Card>
    );
  }

  renderExerciseActivity(workout) {
    return workout.exerciseActivities.map((exerciseActivity, index) => {
      return <ExerciseActivity exerciseActivity={exerciseActivity} />;
    });
  }

  renderExerciseActivity2(workout) {
    return workout.exerciseActivities.map((exerciseActivity, index) => {
      console.log(exerciseActivity);
      return (
        <Card key={index}>
          <CardHeader onClick={() => this.toggle(index)}>
            {exerciseActivity.exercise.name}
          </CardHeader>

          <Collapse isOpen={this.state.collapse[index]}>
            <CardBody>
              <Container>{this.renderSets(exerciseActivity.sets)}</Container>
            </CardBody>
          </Collapse>
        </Card>
      );
    });
  }

  renderSets(sets) {
    return sets.map(set => {
      return (
        <Row>
          <Col>{set.weightKg} Kg</Col>

          <Col>{set.numberOfReps}</Col>

          <Col>{set.status}</Col>
        </Row>
      );
    });
  }
}
export default Workout;
