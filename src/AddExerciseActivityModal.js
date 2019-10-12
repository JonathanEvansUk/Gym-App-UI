import React from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class AddExerciseActivityModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.addExerciseActivity = this.addExerciseActivity.bind(this);
    this.handleExerciseChosen = this.handleExerciseChosen.bind(this);

    this.state = { modal: this.props.modal };
  }

  //TODO move this up to parent
  componentDidMount() {
    fetch("http://localhost:8080/exercises")
      .then(res => res.json())
      .then(res => this.setState({ exercises: res, chosenExercise: res[0] }));
  }

  toggleModal() {
    this.props.toggleModal();

    this.setState({ chosenExercise: this.state.exercises[0] });
  }

  addExerciseActivity() {
    //console.log(this.state.chosenExercise);
    this.props.toggleModal();

    this.props.addExerciseActivity(this.state.chosenExercise);

    this.setState({ chosenExercise: this.state.exercises[0] });
  }

  handleExerciseChosen(event) {
    // console.log("Exercise Chosen");
    // console.log(event.target.value);

    let chosenExercise = this.state.exercises[event.target.value];

    this.setState({ chosenExercise: chosenExercise });
  }

  renderSelectExerciseInput() {
    if (this.state.exercises === undefined) {
      return <p>No exercises found.</p>;
    }

    let exerciseOptions = this.state.exercises.map((exercise, index) => {
      return (
        <option key={exercise.id} value={index}>
          {exercise.name}
        </option>
      );
    });

    return (
      <Input
        type="select"
        id="exerciseSelect"
        onChange={this.handleExerciseChosen}
      >
        {exerciseOptions}
      </Input>
    );
  }

  render() {
    console.log(this.state.exercises);
    return (
      <Modal isOpen={this.props.modal} toggle={this.toggleModal}>
        <ModalHeader>Add Exercise Activity</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exerciseSelect">Select Exercise</Label>
              {this.renderSelectExerciseInput()}
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.addExerciseActivity}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddExerciseActivityModal;
