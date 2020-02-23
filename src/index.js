import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import WorkoutContainer from "./workout/workoutContainer.js";
import Workout from "./workout/workout.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap4-card-tables/dist/bootstrap4-card-tables.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExerciseContainer from "./exercise/ExerciseContainer.js";
import Exercise from "./exercise/Exercise.js";
import MyNavbar from "./navbar.js";

ReactDOM.render(
  <Router>
    <MyNavbar />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/workouts" exact component={WorkoutContainer} />
      <Route path="/workouts/:id" component={Workout} />
      <Route path="/exercises/" exact component={ExerciseContainer} />
      <Route path="/exercises/:id" component={Exercise} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
