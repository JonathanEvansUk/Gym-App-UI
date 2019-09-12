import React from "react";
import ExerciseActivity from "./exerciseActivity/exerciseActivity.js";
import { Button } from "reactstrap";

import { Card, CardHeader, CardBody } from "reactstrap";
import AddExerciseActivityModal from "./AddExerciseActivityModal.js";

class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    console.log(this.props);
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
          />
        </CardHeader>

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
