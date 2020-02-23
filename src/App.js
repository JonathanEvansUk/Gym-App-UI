import React from "react";
import WorkoutContainer from "./workout/workoutContainer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  render() {
    return <WorkoutContainer />;
  }
}
export default App;
