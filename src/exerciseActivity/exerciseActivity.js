import React from "react";
import { Card, CardBody, CardHeader, Collapse, Row, Col } from "reactstrap";
import Set from "./set/Set";

import EditControls from "./EditControls";
import AddSetButton from "./AddSetButton";
class ExerciseActivity extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.deleteExerciseActivity = this.deleteExerciseActivity.bind(this);
    this.saveEdit = this.saveEdit.bind(this);

    this.handleSetTypeEdited = this.handleSetTypeEdited.bind(this);
    this.handleSetRepsEdited = this.handleSetRepsEdited.bind(this);
    this.handleSetWeightKgEdited = this.handleSetWeightKgEdited.bind(this);
    this.handleSetWeightEdited = this.handleSetWeightEdited.bind(this);
    this.handleSetStatusEdited = this.handleSetStatusEdited.bind(this);
    this.addSet = this.addSet.bind(this);
    this.handleSetDeleteClicked = this.handleSetDeleteClicked.bind(this);

    this.state = {
      exerciseActivity: this.props.exerciseActivity,
      collapse: true,
      editable: false,
      sets: this.props.exerciseActivity.sets,
      modal: false
    };
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleCollapse() {
    //this.setState(state => ({ collapse: !state.collapse }));
  }

  toggleEdit(event) {
    //event.stopPropagation();

    this.setState({
      editable: true
    });
  }

  cancelEdit() {
    this.setState({ editable: false });
  }

  deleteExerciseActivity() {
    this.props.deleteExerciseActivity(this.props.exerciseActivity.id);
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

    fetch(
      "http://localhost:8080/workouts/" + this.props.workoutId + "/updateSets",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: json
      }
    ).then(res => console.log(res));

    this.setState({
      exerciseActivity: exerciseActivity
    });
  }

  addSet() {
    let newSet = { type: "WeightedSet", weight: "", weightKg: 0 };

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

  updateSetAtIndex(updatedSet, setIndex) {
    let updatedSets = this.state.sets.slice();

    updatedSets[setIndex] = updatedSet;

    this.setState({ sets: updatedSets });
  }

  handleSetTypeEdited(setType, setIndex) {
    let updatedSet = { ...this.state.sets[setIndex], type: setType };

    if (updatedSet.weight === undefined) {
      updatedSet.weight = "";
    }

    if (updatedSet.weightKg === undefined) {
      updatedSet.weightKg = 0;
    }

    this.updateSetAtIndex(updatedSet, setIndex);
  }

  handleSetWeightKgEdited(event, setIndex) {
    let updatedSet = {
      ...this.state.sets[setIndex],
      weightKg: parseFloat(event.target.value)
    };

    this.updateSetAtIndex(updatedSet, setIndex);
  }

  handleSetWeightEdited(event, setIndex) {
    let updatedSet = {
      ...this.state.sets[setIndex],
      weight: event.target.value
    };

    this.updateSetAtIndex(updatedSet, setIndex);
  }

  handleSetRepsEdited(event, setIndex) {
    let updatedSet = {
      ...this.state.sets[setIndex],
      numberOfReps: parseFloat(event.target.value)
    };

    this.updateSetAtIndex(updatedSet, setIndex);
  }

  handleSetStatusEdited(status, setIndex) {
    let updatedSet = {
      ...this.state.sets[setIndex],
      status: status
    };

    this.updateSetAtIndex(updatedSet, setIndex);
  }

  handleSetDeleteClicked(setIndex) {
    let updatedSets = this.state.sets.slice();

    updatedSets.splice(setIndex, 1);

    this.setState({ sets: updatedSets });
  }

  renderDeleteSetColumn() {
    if (this.state.editable) {
      return <Col xs="1">Delete</Col>;
    }
    return <Col xs="1"></Col>;
  }

  renderExerciseActivityBody() {
    const sets = this.state.sets;

    if (sets === undefined || sets.length === 0) {
      return (
        <p>There are no sets to display. Click the edit button to add sets.</p>
      );
    }

    const deleteSetColumn = this.renderDeleteSetColumn();

    return (
      <div>
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
          onSetTypeEdited={this.handleSetTypeEdited}
          onSetWeightKgEdited={this.handleSetWeightKgEdited}
          onSetWeightEdited={this.handleSetWeightEdited}
          onSetRepsEdited={this.handleSetRepsEdited}
          onSetStatusEdited={this.handleSetStatusEdited}
          onSetDeleteClicked={this.handleSetDeleteClicked}
        />
      </div>
    );
  }

  render() {
    const exerciseActivity = this.props.exerciseActivity;
    const exerciseActivityBody = this.renderExerciseActivityBody();
    return (
      <Card>
        <CardHeader onClick={this.toggleCollapse}>
          {exerciseActivity.exercise.name}

          <EditControls
            editable={this.state.editable}
            onEdit={this.toggleEdit}
            onSave={this.saveEdit}
            onCancel={this.cancelEdit}
            deleteExerciseActivity={this.deleteExerciseActivity}
            modal={this.state.modal}
            toggleModal={this.toggleModal}
          />
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            {exerciseActivityBody}
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
    onSetTypeEdited,
    onSetWeightKgEdited,
    onSetWeightEdited,
    onSetRepsEdited,
    onSetStatusEdited,
    onSetDeleteClicked
  } = props;
  return sets.map((set, index) => {
    return (
      <Set
        key={index}
        set={set}
        index={index}
        editable={editable}
        onSetTypeEdited={onSetTypeEdited}
        onSetWeightKgEdited={onSetWeightKgEdited}
        onSetWeightEdited={onSetWeightEdited}
        onSetRepsEdited={onSetRepsEdited}
        onSetStatusEdited={onSetStatusEdited}
        onSetDeleteClicked={onSetDeleteClicked}
      />
    );
  });
}

export default ExerciseActivity;
