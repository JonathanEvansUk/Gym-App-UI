import React from "react";
import WorkoutTable from "./WorkoutTable.js";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

class WorkoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/workouts/")
      .then(response => response.json())
      .then(data => this.setState({ workouts: data }))
      .catch(console.log);
  }

  render() {
    return (
      <Card>
        <CardHeader>Workouts</CardHeader>
        <CardBody>
          <CardText>Card Text</CardText>
          <WorkoutTable workouts={this.state.workouts} />
        </CardBody>
      </Card>
    );
  }
}
export default WorkoutContainer;
