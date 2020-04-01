import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome.js";
import WorkoutContainer from "./workout/workoutContainer.js";
import Workout from "./workout/workout.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap4-card-tables/dist/bootstrap4-card-tables.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExerciseContainer from "./exercise/ExerciseContainer.js";
import ExerciseFetcher from "./exercise/ExerciseFetcher.js";
import MyNavbar from "./navbar.js";

ReactDOM.render(
  <Router>
    <MyNavbar />
    <Switch>
      <Route path="/" exact component={Welcome} />
      <Route path="/workouts" exact component={WorkoutContainer} />
      <Route path="/workouts/:id" component={Workout} />
      <Route path="/exercises/" exact component={ExerciseContainer} />
      <Route path="/exercises/:id" component={ExerciseFetcher} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
