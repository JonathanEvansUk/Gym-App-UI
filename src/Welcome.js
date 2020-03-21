import React from "react";
import { Container, Jumbotron, Button } from "reactstrap";
import { Link } from "react-router-dom";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  render() {
    return (
      <Container>
        <Jumbotron>
          <h1 className="display-3">Welcome to Gym App!</h1>

          <p className="lead">This is an application used to track Workouts.</p>

          <hr className="my-2" />

          <p>Use the links below to explore the app.</p>

          <Link to="/workouts">
            <Button color="primary">View Workouts</Button>
          </Link>

          <Link to="/exercises">
            <Button className="ml-2" color="success">
              View Exercises
            </Button>
          </Link>
        </Jumbotron>
      </Container>
    );
  }
}
export default Welcome;
