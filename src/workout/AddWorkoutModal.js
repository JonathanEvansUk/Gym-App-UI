import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

class AddWorkoutModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleWorkoutTypeChosen = this.handleWorkoutTypeChosen.bind(this);
    this.addWorkout = this.addWorkout.bind(this);
    this.handleWorkoutNameChanged = this.handleWorkoutNameChanged.bind(this);
    this.handleDateChosen = this.handleDateChosen.bind(this);

    this.state = {};
  }

  //TODO move this up to parent
  componentDidMount() {
    fetch("http://localhost:8080/workoutTypes")
      .then(res => res.json())
      .then(workoutTypes =>
        this.setState({
          workoutName: "",
          workoutTypes: workoutTypes,
          chosenWorkoutType: workoutTypes[0],
          startDate: new Date()
        })
      );
  }

  toggleModal() {
    this.props.toggleModal();
  }

  addWorkout() {
    this.props.addWorkout(
      this.state.workoutName,
      this.state.chosenWorkoutType,
      this.state.startDate
    );

    this.props.toggleModal();
  }

  handleWorkoutNameChanged(event) {
    this.setState({ workoutName: event.target.value });
  }

  handleWorkoutTypeChosen(event) {
    this.setState({ chosenWorkoutType: event.target.value });
  }

  handleDateChosen(date) {
    this.setState({ startDate: date });

    console.log(date);
  }

  renderSelectWorkoutType() {
    if (this.state.workoutTypes === undefined) {
      return <p>No Workout Types Found</p>;
    }

    let workoutTypeOptions = this.state.workoutTypes.map(workoutType => {
      return <option key={workoutType}>{workoutType}</option>;
    });

    return (
      <Input type="select" onChange={this.handleWorkoutTypeChosen}>
        {workoutTypeOptions}
      </Input>
    );
  }

  render() {
    console.log(this.state.workoutTypes);
    return (
      <Modal isOpen={this.props.modal} toggle={this.toggleModal}>
        <ModalHeader>Add Workout</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Name</Label>
              <Input onChange={this.handleWorkoutNameChanged} />
            </FormGroup>

            <FormGroup>
              <Label>Workout Type</Label>
              {this.renderSelectWorkoutType()}
            </FormGroup>

            <FormGroup>
              <Label>Timestamp</Label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChosen}
                timeIntervals={15}
                showTimeSelect
                fixedHeight
                inline
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.addWorkout}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddWorkoutModal;
