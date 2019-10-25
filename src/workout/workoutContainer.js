import React from "react";
import WorkoutTable from "./WorkoutTable.js";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";
import AddWorkoutButton from "./AddWorkoutButton.js";

class WorkoutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAddWorkoutModal = this.toggleAddWorkoutModal.bind(this);
    this.addWorkout = this.addWorkout.bind(this);

    this.state = {
      workouts: [],
      modal: false
    };
  }

  toggleAddWorkoutModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleAddWorkoutResponse(res) {
    if (res.status === 200) {
      res.json().then(res =>
        this.setState({
          workouts: [...this.state.workouts, res]
        })
      );
    } else if (res.status === 400) {
      //TODO this may be removed in future
      res.json().then(res => {
        console.log(res);
      });
    }
  }

  addWorkout(workoutName, workoutType, workoutTime) {
    let createWorkoutJson = JSON.stringify({
      workoutName: workoutName,
      workoutType: workoutType,
      performedAtTimestampUtc: workoutTime
    });

    fetch("http://localhost:8080/workouts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: createWorkoutJson
    }).then(res => this.handleAddWorkoutResponse(res));
  }

  componentDidMount() {
    console.log("Fetching workouts from server");

    fetch("http://localhost:8080/workouts/")
      .then(response => response.json())
      .then(data => this.setState({ workouts: data }))
      .catch(console.log);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          Workouts
          <AddWorkoutButton
            toggleAddWorkoutModal={this.toggleAddWorkoutModal}
            modal={this.state.modal}
            addWorkout={this.addWorkout}
          />
        </CardHeader>
        <CardBody>
          <CardText>Card Text</CardText>
          <WorkoutTable workouts={this.state.workouts} />
        </CardBody>
      </Card>
    );
  }
}
export default WorkoutContainer;
