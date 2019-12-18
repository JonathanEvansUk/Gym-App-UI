import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import WorkoutContainer from "./workout/workoutContainer.js";
import Workout from "./workout/workout.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExerciseContainer from "./exercise/ExerciseContainer.js";
import Exercise from "./exercise/Exercise.js";

ReactDOM.render(
  <Router>
    <Route path="/" exact component={App} />
    <Route path="/workouts/" exact component={WorkoutContainer} />
    <Route path="/workouts/:id" component={Workout} />
    <Route path="/exercises/" exact component={ExerciseContainer} />
    <Route path="/exercises/:id" component={Exercise} />
  </Router>,
  document.getElementById("root")
);
