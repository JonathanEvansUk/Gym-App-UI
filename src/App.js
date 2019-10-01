import React from "react";
import MyNavbar from "./navbar.js";
import WorkoutContainer from "./workout/workoutContainer.js";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  render() {
    return (
      <div>
        <MyNavbar />

        <Link to="/workouts/">Test link</Link>
        <Container>
          <WorkoutContainer />
        </Container>
      </div>
    );
  }
}
export default App;
