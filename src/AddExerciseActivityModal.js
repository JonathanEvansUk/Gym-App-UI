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

    this.state = { modal: this.props.modal };
  }

  componentDidMount() {
    fetch("http://localhost:8080/exercises")
      .then(res => res.json())
      .then(res => this.setState({ exercises: res }));
  }

  toggleModal() {
    this.props.toggleModal();
  }

  renderSelectExerciseInput() {
    if (this.state.exercises === undefined) {
      return <p>No exercises found.</p>;
    }

    let exerciseOptions = this.state.exercises.map(exercise => {
      return <option key={exercise.id}>{exercise.name}</option>;
    });

    return (
      <Input type="select" id="exerciseSelect">
        {exerciseOptions}
      </Input>
    );
  }

  render() {
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
          <Button color="secondary" onClick={this.toggleModal}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddExerciseActivityModal;
