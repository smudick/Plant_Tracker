import React, { Component } from "react";
import PlantData from "../../Helpers/Data/PlantData";
import {
  Plant,
  UserPlantProps,
} from "../../Helpers/Interfaces/PlantInterfaces";
import { Col, Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import DateSelector from "./DatePicker";

export default class UpdatePlantForm extends Component<UserPlantProps> {
  state = {
    notes: this.props.userPlant.notes,
    waterInterval: this.props.userPlant.user_Water_Time,
    nextWaterDate: this.props.userPlant.next_Watered_Date,
    onUpdate: this.props.onUpdate,
    updated: false,
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const userPlant = {
      Id: this.props.userPlant.id,
      User_Id: this.props.userPlant.user_Id,
      Plant_Id: this.props.userPlant.plant_Id,
      Last_Watered_Date: this.props.userPlant.last_Watered_Date,
      Next_Watered_Date: this.state.nextWaterDate,
      Notes: this.state.notes,
      User_Water_Time: parseInt(this.state.waterInterval),
    };
    PlantData.updateUserPlant(userPlant).then(() => {
      this.setState({
        updated: true,
      });
      if (this.props.onUpdate) {
        this.props.onUpdate();
      }
      setTimeout(() => this.setState({ updated: false }), 3000);
    });
  };

  getDate = (selection: Date): void => {
    this.setState({
      nextWaterDate: selection,
    });
  };

  render(): JSX.Element {
    return (
      <div>
          {this.state.updated && (
              <Alert color="success" className="d-flex justify-content-center">
                  <h4>Plant Info Updated!</h4>
              </Alert>
          )}
          <div className="d-flex justify-content-center">

        <h1 className='m-4'>Update Plant Info</h1>
          </div>
        <Form onSubmit={this.handleSubmit} className="d-flex flex-column justify-content-center m-3">
          <FormGroup row>
            <Label for="waterInterval" sm={10}>
              Set The Amount Of Days Between Waterings
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="waterInterval"
                id="waterInterval"
                value={this.state.waterInterval}
                onChange={this.handleChange}
                placeholder="Set Interval Between Watering In Days"
                className={`form-control-lg`}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="notes" sm={10}>
              Enter Any Notes About This Plant
            </Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="notes"
                value={this.state.notes}
                onChange={this.handleChange}
                placeholder="Plant Notes"
                className={`form-control-lg`}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={10}>
              Adjust This Plant's Next Scheduled Watering Date
            </Label>
            <Col sm={10}>
              <DateSelector
                getDate={this.getDate}
                currentDate={this.state.nextWaterDate}
              />
            </Col>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
