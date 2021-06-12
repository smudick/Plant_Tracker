import { Component } from "react";
import { Col, Button, Form, FormGroup, Input, Label } from "reactstrap";

export default class CreatePlantForm extends Component<any> {
  state = {
    Scientific_Name: "",
    Common_Name: "",
    Shade: 0,
    Moisture_Use: 0,
    Soil_Watering_Indicator: 0,
    Max_Width: 0,
    Toxic_Dogs: false,
    Toxic_Cats: false,
    Type: 0,
    Flowering: false,
    Hanging: false,
    Air_Purifying: false,
    Max_Height: 0,
    Ph_Soil: "",
    Bloom: "",
    Watering_Interval: 0,
    User_Id: 0,
    Image_Url: "",
    created: false,
    user: this.props.user,
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = () => {
    console.log("submitted");
  };
  render(): JSX.Element {
    return (
      <div>
        {this.state.created && (
          <div>
            <h2>Plant Created</h2>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <h1>Create a Custom Plant</h1>
        </div>
        <Form
          onSubmit={this.handleSubmit}
          className="d-flex flex-column justify-content-center m-3"
        >
          <FormGroup row>
            <Label for="Common_Name" sm={10}>
              Common Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="Common_Name"
                id="Common_Name"
                value={this.state.Common_Name}
                onChange={this.handleChange}
                placeholder="Common Name"
                className={`form-control-lg`}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Scientific_Name" sm={10}>
              Scientific Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="Scientific_Name"
                id="Scientific_Name"
                value={this.state.Scientific_Name}
                onChange={this.handleChange}
                placeholder="Scientific Name"
                className={`form-control-lg`}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
              <Label for="Shade" sm={10}>
                  How much shade is needed?
              </Label>
              <Col sm={10}>
                  <Input
                    type="select"
                    name="Shade"
                    id="Shade"
                    value={this.state.Shade}
                    onChange={this.handleChange}
                  >
                  <option value={0} selected disabled hidden></option>
                  <option value={1}>Full Sun</option>
                  <option value={2}>Mostly Sun</option>
                  <option value={3}>Partial Sun</option>
                  <option value={4}>Mostly Shade</option>
                  <option value={5}>Full Shade</option>
                  </Input>
              </Col>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
