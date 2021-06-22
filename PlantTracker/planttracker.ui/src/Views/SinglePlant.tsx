import { Component } from "react";
import {
  Plant,
  PlantProps,
  UserPlant,
} from "../Helpers/Interfaces/PlantInterfaces";
import { PlantType } from "../Helpers/Interfaces/PlantType";
import PlantData from "../Helpers/Data/PlantData";
import { User } from "../Helpers/Interfaces/UserInterface";
import UpdatePlantModal from "../Components/Modals/UpdatePlantModal";

type SinglePlantState = {
  plant?: Plant;
  type: PlantType;
  user: User | null;
  userPlant: UserPlant;
  added: boolean;
};

class SinglePlant extends Component<PlantProps> {
  state: SinglePlantState = {
    plant: this.props.location.state.plant,
    type: "",
    user: this.props.location.state.user,
    userPlant: this.props.location.state.userPlant,
    added: false,
  };

  componentDidMount = (): void => {
    PlantData.getPlantType(this.state.plant.type).then((response) => {
      this.setState({
        type: response.type,
      });
    });
  };
  onUpdate = (): void => {
    PlantData.getUserPlantById(this.state.userPlant.id).then((response: UserPlant) => {
          this.setState({
            userPlant: response,
          });
        });
      }

  addPlant = (user: User, plant: Plant): void => {
    const userPlant = {
      User_Id: user.id,
      Plant_Id: plant.id,
      User_Water_Time: plant.watering_Interval,
    };
    PlantData.addPlantToUser(userPlant);
    this.setState({
      added: true,
    });
    setTimeout(() => this.setState({ added: false }), 3000);
  };

  shadeCalc = (shade: number): string => {
    switch (shade) {
      case 1:
        return "Full Sun";
      case 2:
        return "Mostly Sun";
      case 3:
        return "Partial Sun";
      case 4:
        return "Mostly Shade";
      case 5:
        return "Full Shade";
      default:
        return "unknown";
    }
  };
  waterIndicatorCalc = (soil: number): string => {
    switch (soil) {
      case 1:
        return "Do not water until soil is completely dry";
      case 2:
        return "Water when soil is mostly dry";
      case 3:
        return "Water when the soil is somewhat dry";
      case 4:
        return "Soil should never be dry";
      default:
        return "unknown";
    }
  };
  moistureCalc = (moisture: number): string => {
    switch (moisture) {
      case 1:
        return "Low";
      case 2:
        return "Low-Med";
      case 3:
        return "Medium";
      case 4:
        return "High-Med";
      case 5:
        return "High";
      default:
        return "unknown";
    }
  };
  bloomCalc = (bloom: string): string => {
    if (bloom === "N/A") {
      return "This plant does not bloom";
    } else {
      return bloom;
    }
  };
  dateCheck = (date: string): string => {
    if (date === "0001-01-01T00:00:00") {
      return "No date set or recorded";
    } else {
      const formattedDate = new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }
  };

  render(): JSX.Element {
    const { plant, type, userPlant, user, added } = this.state;

    return (
      <div className="d-flex justify-content-center">
        <div className="single-plant-container">
          {added && <h1>Plant has been added!</h1>}
            <img className="single-plant-image" src={plant.image_Url}></img>
          <div className='d-flex '>
            <div className="single-plant-header">
              <h1>{plant.common_Name}</h1>
              <h4>
                <em>{plant.scientific_Name}</em>
              </h4>
              <h5>{type}</h5>
            </div>
          </div>
          <div className="d-flex">
            <div className="care-recs">
              <h2>Care Recommendations</h2>
              <p>Soil pH: {plant.ph_Soil}</p>
              <p>Amount of Sun: {this.shadeCalc(plant.shade)}</p>
              <p>Moisture Usage: {this.moistureCalc(plant.moisture_Use)}</p>
              <p>
                Soil watering indicator:{" "}
                {this.waterIndicatorCalc(plant.soil_Watering_Indicator)}
              </p>
            </div>
            {(userPlant && user) && (
              <div className="plant-info">
                <h2>Plant Information</h2>
                <p>Bloom color: {this.bloomCalc(plant.bloom)}</p>
                <p>Plant Nickname: {userPlant.name}</p>
                <p>Days between each watering: {userPlant.user_Water_Time}</p>
                <p>
                  Last watered date:{" "}
                  {this.dateCheck(userPlant.last_Watered_Date)}
                </p>
                <p>
                  Next scheduled watering date:{" "}
                  {this.dateCheck(userPlant.next_Watered_Date)}
                </p>
                <p>Notes: {userPlant.notes}</p>
                <UpdatePlantModal
                  user={user}
                  plant={plant}
                  userPlant={userPlant}
                  onUpdate={this.onUpdate}
                >
                  Edit
                </UpdatePlantModal>
              </div>
            )}
          </div>
          {userPlant === null && (
            <button className="addPlantButton" onClick={() => this.addPlant(user, plant)}>
              Add Plant
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default SinglePlant;
