import React from "react";
import WorkoutContainer from "./workout/workoutContainer.js";
import { Container } from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  render() {
    return (
      <Container>
        <WorkoutContainer />
      </Container>
    );
  }
}
export default App;
