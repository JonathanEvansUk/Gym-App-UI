import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import WorkoutContainer from "./workoutContainer.js";
import Workout from "./workout.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Route path="/" exact component={App} />
    <Route path="/workouts/" exact component={WorkoutContainer} />
    <Route path="/workouts/:id" component={Workout} />
  </Router>,
  document.getElementById("root")
);
