import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Button,
  Row,
  Col
} from "reactstrap";
import Set from "./set/Set";

import EditControls from "./EditControls";
import AddSetButton from "./AddSetButton";

class ExerciseActivity extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.handleSetRepsEdited = this.handleSetRepsEdited.bind(this);
    this.handleSetWeightEdited = this.handleSetWeightEdited.bind(this);
    this.handleSetStatusEdited = this.handleSetStatusEdited.bind(this);
    this.addSet = this.addSet.bind(this);

    this.state = {
      exerciseActivity: this.props.exerciseActivity,
      collapse: true,
      editable: false,
      newSets: []
    };
  }

  toggleCollapse() {
    //this.setState(state => ({ collapse: !state.collapse }));
  }

  toggleEdit(event) {
    event.stopPropagation();
    this.setState(state => ({ editable: !state.editable }));
  }

  cancelEdit() {
    this.setState({ editable: false, newSets: [] });
  }

  saveEdit() {
    this.setState({ editable: false });

    // Do not make call to server if no changes
    if (this.state.newExerciseActivity === undefined) {
    } else {
      let ea = this.state.newExerciseActivity;

      let json = JSON.stringify({
        id: ea.id,
        exercise: ea.exercise,
        sets: ea.sets,
        notes: ea.notes
      });

      fetch("http://localhost:8080/workouts/1/updateSets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: json
      }).then(res => console.log(res));

      this.setState({
        exerciseActivity: ea,
        newExerciseActivity: undefined
      });
    }
  }

  addSet(exerciseActivityId) {
    let newExerciseActivity = this.state.newExerciseActivity;

    // Check if we have tried to edit before.
    if (newExerciseActivity === undefined) {
      newExerciseActivity = this.copyExerciseActivity();
    }

    newExerciseActivity.sets.push();

    this.setState({
      newExerciseActivity: newExerciseActivity
    });
  }

  copyExerciseActivity() {
    return {
      id: this.props.exerciseActivity.id,
      exercise: Object.assign({}, this.props.exerciseActivity.exercise),
      sets: this.props.exerciseActivity.sets.slice()
    };
  }

  handleSetWeightEdited(event, setIndex) {
    let newExerciseActivity = this.state.newExerciseActivity;

    // Check if we have tried to edit before.
    if (newExerciseActivity === undefined) {
      newExerciseActivity = this.copyExerciseActivity();
    }

    // Copy old set and update the weight
    let newSet = {
      ...newExerciseActivity.sets[setIndex],
      weightKg: parseFloat(event.target.value)
    };

    newExerciseActivity.sets[setIndex] = newSet;

    this.setState({
      newExerciseActivity: newExerciseActivity
    });
  }

  handleSetRepsEdited(event, setIndex) {
    let newExerciseActivity = this.state.newExerciseActivity;

    // Check if we have tried to edit before.
    if (newExerciseActivity === undefined) {
      newExerciseActivity = this.copyExerciseActivity();
    }

    // Copy old set and update the numberOfReps
    let newSet = {
      ...newExerciseActivity.sets[setIndex],
      numberOfReps: parseFloat(event.target.value)
    };

    newExerciseActivity.sets[setIndex] = newSet;

    this.setState({
      newExerciseActivity: newExerciseActivity
    });
  }

  handleSetStatusEdited(status, setIndex) {
    let newExerciseActivity = this.state.newExerciseActivity;

    // Check if we have tried to edit before.
    if (newExerciseActivity === undefined) {
      newExerciseActivity = this.copyExerciseActivity();
    }

    // Copy old set and update the status
    let newSet = {
      ...newExerciseActivity.sets[setIndex],
      status: status
    };

    newExerciseActivity.sets[setIndex] = newSet;

    this.setState({
      newExerciseActivity: newExerciseActivity
    });
  }

  handleSetDeleteClicked(setIndex) {
    // let newExerciseActivity = this.state.newExerciseActivity;
    // // Check if we have tried to edit before.
    // if (newExerciseActivity === undefined) {
    //   newExerciseActivity = this.copyExerciseActivity();
    // }
  }

  renderDeleteSetColumn() {
    if (this.state.editable) {
      return <Col xs="auto">Delete</Col>;
    }
    return null;
  }

  render() {
    const exerciseActivity = this.state.exerciseActivity;
    const sets = exerciseActivity.sets.slice().concat(this.state.newSets);
    const deleteSetColumn = this.renderDeleteSetColumn();
    return (
      <Card>
        <CardHeader onClick={this.toggleCollapse}>
          {exerciseActivity.exercise.name}

          <EditControls
            editable={this.state.editable}
            onEdit={this.toggleEdit}
            onSave={this.saveEdit}
            onCancel={this.cancelEdit}
          />
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <Row>
              <Col xs="auto">#</Col>
              <Col>Weight</Col>
              <Col>Reps</Col>
              <Col>Status</Col>
              {deleteSetColumn}
            </Row>

            <Sets
              sets={sets}
              editable={this.state.editable}
              onSetWeightEdited={this.handleSetWeightEdited}
              onSetRepsEdited={this.handleSetRepsEdited}
              onSetStatusEdited={this.handleSetStatusEdited}
              onSetDeleteClicked={this.handleSetDeleteClicked}
            />

            <AddSetButton
              exerciseActivityId={exerciseActivity.id}
              editable={this.state.editable}
              onAddSet={this.addSet}
            />
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

function Sets(props) {
  const {
    editable,
    sets,
    onSetWeightEdited,
    onSetRepsEdited,
    onSetStatusEdited
  } = props;
  return sets.map((set, index) => {
    return (
      <Set
        set={set}
        index={index}
        editable={editable}
        onSetWeightEdited={onSetWeightEdited}
        onSetRepsEdited={onSetRepsEdited}
        onSetStatusEdited={onSetStatusEdited}
      />
    );
  });
}

export default ExerciseActivity;
