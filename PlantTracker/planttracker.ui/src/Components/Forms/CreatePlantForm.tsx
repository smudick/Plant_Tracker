import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import PlantData from "../../Helpers/Data/PlantData";
import { PlantType } from "../../Helpers/Interfaces/PlantType";
import firebase from "firebase/app";
import "firebase/storage";
import firebaseApp from "../../Helpers/fbConnection";

export default class CreatePlantForm extends Component<any> {
  state = {
    Scientific_Name: "",
    Common_Name: "",
    Shade: 0,
    Moisture_Use: 0,
    Soil_Watering_Indicator: 0,
    Max_Width: 0,
    Max_Height: 0,
    Toxic_Dogs: false,
    Toxic_Cats: false,
    Hanging: false,
    Flowering: false,
    Air_Purifying: false,
    Type: 0,
    Ph_Soil: "",
    Bloom: "",
    Watering_Interval: 0,
    User_Id: 0,
    Image_Url: "",
    user: this.props.user,
    created: false,
  };

  plantTypes: { id: number; type: string }[] = [
    {
      id: 0,
      type: "temp",
    },
  ];
  componentDidMount = (): void => {
    PlantData.getAllTypes().then((response) => {
      this.plantTypes = response;
    });
    this.setState({
      User_Id: this.state.user.id,
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "filename" && e.target.files) {
      this.setState({ Image_Url: "" });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `plant-tracker/${this.state.User_Id}/${Date.now()}${
          e.target.files[0].name
        }`
      );
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((Image_Url) => {
          this.setState({ Image_Url });
        });
      });
    } else if (e.target.name === "Shade" || e.target.name === "Type" || e.target.name === "Max_Width" || e.target.name === "Max_Height" || e.target.name === "Moisture_Use" || e.target.name === "Soil_Watering_Indicator" || e.target.name === "Watering_Interval") {
      this.setState({
        [e.target.name]: parseInt(e.target.value),
      });
    } else { 
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  handleTrueFalse = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };
  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const plant = {
      Scientific_Name: this.state.Scientific_Name,
      Common_Name: this.state.Common_Name,
      Shade: this.state.Shade,
      Moisture_Use: this.state.Moisture_Use,
      Soil_Watering_Indicator: this.state.Soil_Watering_Indicator,
      Max_Width: this.state.Max_Width,
      Max_Height: this.state.Max_Height,
      Toxic_Dogs: this.state.Toxic_Dogs,
      Toxic_Cats: this.state.Toxic_Cats,
      Hanging: this.state.Hanging,
      Flowering: this.state.Flowering,
      Air_Purifying: this.state.Air_Purifying,
      Type: this.state.Type,
      Ph_Soil: this.state.Ph_Soil,
      Bloom: this.state.Bloom,
      Watering_Interval: this.state.Watering_Interval,
      User_Id: this.state.User_Id,
      Image_Url: this.state.Image_Url,
    };
    PlantData.addCustomPlant(plant).then((response) => {
      PlantData.getMostRecentUserPlant(response.user_Id).then((recentResponse) => {
        const userPlant = {
          User_Id: response.user_Id,
          Plant_Id: recentResponse.id,
          User_Water_Time: response.watering_Interval,
        };
        PlantData.addPlantToUser(userPlant);
      })
    })
    this.setState({
      created: true,
    });
    setTimeout(() => this.setState({ created: false }), 3000);
  };
  render(): JSX.Element {
    const typeOption = (plantType: PlantType): JSX.Element => {
      return <option value={plantType.id}>{plantType.type}</option>;
    };
    const createTypeOptions = (plantTypes: PlantType[]) => {
      const options: PlantType[] = [];
      plantTypes.forEach((plantType) => {
        options.push(typeOption(plantType));
      });
      return options;
    };
    const options = createTypeOptions(this.plantTypes);
    return (
      <div className="customPlantForm">
        {this.state.created && (
          <div color="success" className="formAlert">
            <h5>Plant Created</h5>
          </div>
        )}
        <div>
          <h1>Create a Custom Plant</h1>
          <p className="mt-3">
            Please fill out the following fields to the best of your knowledge.
            <br></br>If you can't answer every question, no worries.<br></br>
            Only fields with * are required
          </p>
        </div>
        <Form
          onSubmit={this.handleSubmit}
          className="d-flex flex-column justify-content-center m-3"
        >
          <FormGroup row>
            <Label for="Common_Name" sm={10}>
              *Common Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="Common_Name"
                id="Common_Name"
                value={this.state.Common_Name}
                onChange={this.handleChange}
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
                className={`form-control-lg`}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Type" sm={10}>
              *Select the plant type
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="Type"
                id="Type"
                value={this.state.Type}
                onChange={this.handleChange}
                required
              >
                <option selected></option>
                {options}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Watering_Interval" sm={10}>
              *How many days should be between each watering?
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="Watering_Interval"
                id="Watering_Interval"
                value={this.state.Watering_Interval}
                onChange={this.handleChange}
                className={`form-control-lg`}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Image_Url" sm={10}>
              Upload an image or enter a URL
            </Label>
            <Col sm={10}>
              <Input
                type="url"
                name="Image_Url"
                id="Image_Url"
                value={this.state.Image_Url}
                onChange={this.handleChange}
                className={`form-control-lg`}
              />
              <Input
                type="file"
                id="myFile"
                name="filename"
                accept="image/*"
                onChange={this.handleChange}
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
          <FormGroup row>
            <Label for="Moisture_Use" sm={10}>
              How quickly does this plant absorb water?
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="Moisture_Use"
                id="Moisture_Use"
                value={this.state.Moisture_Use}
                onChange={this.handleChange}
              >
                <option value={0} selected disabled hidden></option>
                <option value={1}>Very Slowly</option>
                <option value={2}>Slowly</option>
                <option value={3}>Medium</option>
                <option value={4}>Quickly</option>
                <option value={5}>Very Quickly</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Soil_Watering_Indicator" sm={10}>
              How dry should the plant's soil be before watering?
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="Soil_Watering_Indicator"
                id="Soil_Watering_Indicator"
                value={this.state.Soil_Watering_Indicator}
                onChange={this.handleChange}
              >
                <option value={0} selected disabled hidden></option>
                <option value={1}>Completely Dry</option>
                <option value={2}>Mostly Dry</option>
                <option value={3}>Somewhat Dry</option>
                <option value={4}>Soil should never be dry</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Max_Width" sm={10}>
              How wide in feet can this plant grow?
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="Max_Width"
                id="Max_Width"
                value={this.state.Max_Width}
                onChange={this.handleChange}
                className={`form-control-lg`}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Max_Height" sm={10}>
              How tall in feet can this plant grow?
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="Max_Height"
                id="Max_Height"
                value={this.state.Max_Height}
                onChange={this.handleChange}
                className={`form-control-lg`}
              />
            </Col>
          </FormGroup>
          <Label className="mb-2">
            Check all of the following characteristics that apply to your plant:
          </Label>
          <div className="m-2 col-6">
            <FormGroup tag="fieldset" row id="Toxic_Dogs">
              <Col sm={10}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="Toxic_Dogs"
                      onChange={this.handleTrueFalse}
                    />{" "}
                    Toxic to dogs
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row id="Toxic_Cats">
              <Col sm={10}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="Toxic_Cats"
                      onChange={this.handleTrueFalse}
                    />{" "}
                    Toxic to cats
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row id="Hanging">
              <Col sm={10}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="Hanging"
                      onChange={this.handleTrueFalse}
                    />{" "}
                    Hanging
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row id="Flowering">
              <Col sm={10}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="Flowering"
                      onChange={this.handleTrueFalse}
                    />{" "}
                    Flowering
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row id="Air_Purifying">
              <Col sm={10}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="Air_Purifying"
                      onChange={this.handleTrueFalse}
                    />{" "}
                    Air purifying
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
          </div>
          <FormGroup row>
            <Label for="Ph_Soil" sm={10}>
              What Ph Level Should the Plant's soil be?
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="Ph_Soil"
                id="Ph_Soil"
                value={this.state.Ph_Soil}
                onChange={this.handleChange}
                className={`form-control-lg`}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Bloom" sm={10}>
              If the plant blooms, what color(s) are its flowers?
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="Bloom"
                id="Bloom"
                value={this.state.Bloom}
                onChange={this.handleChange}
                className={`form-control-lg`}
              />
            </Col>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
