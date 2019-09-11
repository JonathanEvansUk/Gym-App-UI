import React from "react";
import ExerciseActivity from "./exerciseActivity/exerciseActivity.js";

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

    console.log(this.props);
    this.state = {
      loaded: false,
      workout: undefined
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

  render() {
    const { workout } = this.state;
    if (workout === undefined) {
      return <h1>Loading...</h1>;
    }
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
}
export default Workout;
