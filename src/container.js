import React from "react";
import ReactDOM from "react-dom";
import { Card, CardBody, CardTitle, CardText, Container } from "reactstrap";

class MyContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>Title</CardTitle>

            <CardText>Text</CardText>
          </CardBody>
        </Card>
      </Container>
    );
  }
}
export default MyContainer;
