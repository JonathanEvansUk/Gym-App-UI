import React from "react";
import { Card, CardBody, CardHeader, Collapse, Row, Col } from "reactstrap";
import Set from "./set/Set";

import EditControls from "./EditControls";
import AddSetButton from "./AddSetButton";
import { stat } from "fs";

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
    this.handleSetDeleteClicked = this.handleSetDeleteClicked.bind(this);

    this.state = {
      exerciseActivity: this.props.exerciseActivity,
      collapse: true,
      editable: false,
      sets: this.props.exerciseActivity.sets
    };
  }

  toggleCollapse() {
    //this.setState(state => ({ collapse: !state.collapse }));
  }

  toggleEdit(event) {
    event.stopPropagation();

    this.setState({
      editable: true
    });
  }

  cancelEdit() {
    this.setState({ editable: false });
  }

  saveEdit() {
    this.setState({ editable: false });

    let { exerciseActivity } = this.props;

    let json = JSON.stringify({
      id: exerciseActivity.id,
      exercise: exerciseActivity.exercise,
      sets: this.state.sets,
      notes: exerciseActivity.notes
    });

    fetch("http://localhost:8080/workouts/1/updateSets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: json
    }).then(res => console.log(res));

    this.setState({
      exerciseActivity: exerciseActivity
    });
  }

  addSet() {
    let newSet = {};

    let updatedSets = this.state.sets.slice();

    updatedSets.push(newSet);

    this.setState({ sets: updatedSets });
  }

  copyExerciseActivity() {
    return {
      id: this.props.exerciseActivity.id,
      exercise: Object.assign({}, this.props.exerciseActivity.exercise),
      sets: this.props.exerciseActivity.sets.slice()
    };
  }

  handleSetWeightEdited(event, setIndex) {
    let updatedSet = {
      ...this.state.sets[setIndex],
      weightKg: parseFloat(event.target.value)
    };

    let updatedSets = this.state.sets.slice();

    updatedSets[setIndex] = updatedSet;

    this.setState({ sets: updatedSets });
  }

  handleSetRepsEdited(event, setIndex) {
    let updatedSet = {
      ...this.state.sets[setIndex],
      numberOfReps: parseFloat(event.target.value)
    };

    let updatedSets = this.state.sets.slice();

    updatedSets[setIndex] = updatedSet;

    this.setState({ sets: updatedSets });
  }

  handleSetStatusEdited(status, setIndex) {
    let updatedSet = {
      ...this.state.sets[setIndex],
      status: status
    };

    let updatedSets = this.state.sets.slice();

    updatedSets[setIndex] = updatedSet;

    this.setState({ sets: updatedSets });
  }

  handleSetDeleteClicked(setIndex) {
    let updatedSets = this.state.sets.slice();

    updatedSets.splice(setIndex, 1);

    this.setState({ sets: updatedSets });
  }

  renderDeleteSetColumn() {
    if (this.state.editable) {
      return <Col xs="auto">Delete</Col>;
    }
    return null;
  }

  render() {
    const exerciseActivity = this.state.exerciseActivity;
    const sets = this.state.sets;
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
    onSetStatusEdited,
    onSetDeleteClicked
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
        onSetDeleteClicked={onSetDeleteClicked}
      />
    );
  });
}

export default ExerciseActivity;
