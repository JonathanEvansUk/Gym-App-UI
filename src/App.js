import React from "react";
import WorkoutContainer from "./workout/workoutContainer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  render() {
    return "Welcome to the gym app";
  }
}
export default App;
