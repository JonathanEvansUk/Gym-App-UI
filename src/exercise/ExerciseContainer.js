import React from "react";
import ExerciseTable from "./ExerciseTable.js";

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
    return <ExerciseTable exercises={this.state.exercises} />;
  }
}

export default ExerciseContainer;
