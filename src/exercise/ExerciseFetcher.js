import React from "react";

import WithLoadableEntity from "../WithLoadableEntity";
import Exercise from "../exercise/Exercise.js";

class ExerciseFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { exercise: undefined, loading: true, notFound: false };
  }

  componentDidMount() {
    fetch("http://localhost:8080/exercises/" + this.props.match.params.id).then(
      res => this.handleResponse(res)
    );
  }

  handleResponse(response) {
    if (response.status === 200) {
      response
        .json()
        .then(exercise =>
          this.setState({ exercise: exercise, loading: false })
        );
    } else if (response.status === 404) {
      this.setState({ notFound: true, loading: false });
    }
  }

  render() {
    return (
      <WithLoadableEntity
        loading={this.state.loading}
        notFound={this.state.notFound}
        id={this.props.match.params.id}
      >
        <Exercise exercise={this.state.exercise} />
      </WithLoadableEntity>
    );
  }
}

export default ExerciseFetcher;
