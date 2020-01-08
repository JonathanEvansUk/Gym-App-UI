import React from "react";

import { Card, CardHeader, CardBody, Badge } from "reactstrap";
import Metrics from "./Metrics";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercise: undefined,
      loading: true,
      notFound: false,
      metrics: undefined
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/exercises/" + this.props.match.params.id).then(
      res => this.handleResponse(res)
    );

    fetch(
      "http://localhost:8080/exercises/" +
        this.props.match.params.id +
        "/metrics"
    )
      .then(res => res.json())
      .then(metrics => this.setState({ metrics: metrics }));
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
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    if (this.state.notFound) {
      return <h1>No exercise found for id: {this.props.match.params.id}</h1>;
    }

    const { exercise } = this.state;
    return (
      <Card>
        <CardHeader>
          {exercise.name}
          <Badge className="float-right">{exercise.muscleGroup}</Badge>
        </CardHeader>

        <CardBody>
          <Metrics metrics={this.state.metrics} />
        </CardBody>
      </Card>
    );
  }
}

export default Exercise;
