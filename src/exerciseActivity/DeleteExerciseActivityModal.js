import React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
class DeleteExerciseActivityModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.deleteExerciseActivity = this.deleteExerciseActivity.bind(this);

    this.state = { modal: this.props.modal };
  }

  toggleModal() {
    this.props.toggleModal();
  }

  deleteExerciseActivity() {
    this.props.toggleModal();

    this.props.deleteExerciseActivity();
  }

  render() {
    return (
      <Modal isOpen={this.props.modal} toggle={this.toggleModal}>
        <ModalHeader>Delete exercise activity</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModal}>
            Cancel
          </Button>

          <Button color="primary" onClick={this.deleteExerciseActivity}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteExerciseActivityModal;
