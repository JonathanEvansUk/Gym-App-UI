import React from "react";
import WorkoutTable from "./WorkoutTable.js";
import { Container, Card, CardHeader } from "reactstrap";
import AddWorkoutButton from "./AddWorkoutButton.js";

class WorkoutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAddWorkoutModal = this.toggleAddWorkoutModal.bind(this);
    this.addWorkout = this.addWorkout.bind(this);
    this.handleNewWorkoutTypeEdited = this.handleNewWorkoutTypeEdited.bind(
      this
    );
    this.handleNewWorkoutTimestampEdited = this.handleNewWorkoutTimestampEdited.bind(
      this
    );

    this.state = {
      workouts: [],
      modal: false,
      workoutTypes: [],
      newWorkout: {
        workoutType: undefined,
        performedAtTimestampUtc: new Date()
      }
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
          workouts: [...this.state.workouts, res],
          newWorkout: {
            workoutType: this.state.workoutTypes[0],
            performedAtTimestampUtc: new Date()
          }
        })
      );
    } else if (res.status === 400) {
      //TODO this may be removed in future
      res.json().then(res => {
        console.log(res);
      });
    }
  }

  handleNewWorkoutTypeEdited(event) {
    event.persist();
    this.setState(prevState => ({
      newWorkout: { ...prevState.newWorkout, workoutType: event.target.value }
    }));
  }

  handleNewWorkoutTimestampEdited(timestamp) {
    this.setState(prevState => ({
      newWorkout: {
        ...prevState.newWorkout,
        performedAtTimestampUtc: timestamp
      }
    }));
  }

  addWorkout() {
    let createWorkoutJson = JSON.stringify(this.state.newWorkout);

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

    fetch("http://localhost:8080/workoutTypes")
      .then(res => res.json())
      .then(workoutTypes =>
        this.setState(prevState => ({
          workoutTypes: workoutTypes,
          newWorkout: {
            ...prevState.newWorkout,
            workoutType: workoutTypes[0]
          }
        }))
      );
  }

  render() {
    return (
      <Container fluid>
        <Card>
          <CardHeader>
            Workouts
            <AddWorkoutButton
              toggleAddWorkoutModal={this.toggleAddWorkoutModal}
              modal={this.state.modal}
              addWorkout={this.addWorkout}
              handleNewWorkoutTypeEdited={this.handleNewWorkoutTypeEdited}
              handleNewWorkoutTimestampEdited={
                this.handleNewWorkoutTimestampEdited
              }
              newWorkout={this.state.newWorkout}
              workoutTypes={this.state.workoutTypes}
              initialWorkoutType={this.state.workoutTypes[0]}
              performedAtTimestampUtc={
                this.state.newWorkout.performedAtTimestampUtc
              }
            />
          </CardHeader>

          <WorkoutTable workouts={this.state.workouts} />
        </Card>
      </Container>
    );
  }
}
export default WorkoutContainer;
