import React from "react";
import ExerciseTable from "./ExerciseTable.js";
import { Card, Container } from "reactstrap";

class ExerciseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }

  componentDidMount() {
    console.log("fetching exercises");
    fetch("http://localhost:8080/exercises")
      .then(res => res.json())
      .then(exercises => this.setState({ exercises: exercises }));
  }

  render() {
    return (
      <Container>
        <Card>
          <ExerciseTable exercises={this.state.exercises} />
        </Card>
      </Container>
    );
  }
}

export default ExerciseContainer;
