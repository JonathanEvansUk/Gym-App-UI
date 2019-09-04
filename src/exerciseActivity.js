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
import Set from "./Set";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

class ExerciseActivity extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.handleSetRepsEdited = this.handleSetRepsEdited.bind(this);
    this.handleSetWeightEdited = this.handleSetWeightEdited.bind(this);

    this.state = {
      exerciseActivity: this.props.exerciseActivity,
      collapse: true,
      editable: false
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
    this.setState({ editable: false });
  }

  saveEdit() {
    this.setState({ editable: false });

    console.log(this.state.newExerciseActivity);
  }

  copyExerciseActivity() {
    return {
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

  render() {
    const exerciseActivity = this.state.exerciseActivity;
    return (
      <Card>
        <CardHeader onClick={this.toggleCollapse}>
          {exerciseActivity.exercise.name}

          {this.renderEditControls()}
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <Row>
              <Col xs="auto">#</Col>
              <Col>Weight</Col>
              <Col>Reps</Col>
              <Col>Status</Col>
            </Row>
            {this.renderSets(exerciseActivity.sets)}
          </CardBody>
        </Collapse>
      </Card>
    );
  }

  renderEditControls() {
    if (this.state.editable) {
      return (
        <EditingControls onCancel={this.cancelEdit} onSave={this.saveEdit} />
      );
    } else {
      return <ViewingControls onClick={this.toggleEdit} />;
    }
  }

  renderSets(sets) {
    const editable = this.state.editable;
    return sets.map((set, index) => {
      return (
        <Set
          set={set}
          index={index}
          editable={editable}
          onSetWeightEdited={this.handleSetWeightEdited}
          onSetRepsEdited={this.handleSetRepsEdited}
        />
      );
    });
  }
}

function EditingControls(props) {
  return (
    <div className="float-right">
      <CancelButton onClick={props.onCancel} />
      <SaveButton onClick={props.onSave} />
    </div>
  );
}

function ViewingControls(props) {
  return (
    <div className="float-right">
      <EditButton onClick={props.onClick} />
    </div>
  );
}

function EditButton(props) {
  return (
    <Button color="primary" onClick={props.onClick} size="sm">
      Edit <FontAwesomeIcon icon={faEdit} />
    </Button>
  );
}

function SaveButton(props) {
  return (
    <Button color="success" onClick={props.onClick} size="sm">
      Save <FontAwesomeIcon icon={faCheck} />
    </Button>
  );
}

function CancelButton(props) {
  return (
    <Button className="mr-2" onClick={props.onClick} color="danger" size="sm">
      Cancel <FontAwesomeIcon icon={faTimes} />
    </Button>
  );
}
export default ExerciseActivity;
