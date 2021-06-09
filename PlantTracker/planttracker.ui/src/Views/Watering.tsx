import { Component } from "react";
import {
  PlantProps,
  Plant,
  UserPlant,
} from "../Helpers/Interfaces/PlantInterfaces";
import PlantData from "../Helpers/Data/PlantData";
import PlantCard from "../Components/Cards/PlantCard";

class Watering extends Component<PlantProps> {
  state = {
    plants: [],
    userPlants: [],
    user: this.props.user.user,
  };
  componentDidMount(): void {
    PlantData.getPlantsForSingleUser(1).then((response: Plant[]) => {
      PlantData.getUserPlants(1).then((userPlantResponse) => {
        this.setState({
          plants: response,
          userPlants: userPlantResponse,
        });
      });
    });
  }
  onUpdate(): void {
      PlantData.getUserPlants(1).then((userPlantResponse: UserPlant[]) => {
        this.setState({
          userPlants: userPlantResponse,
        });
      });
  }
  formatDate = (date: string): string => {
    if (date === "0001-01-01T00:00:00") {
      return "No watering date scheduled";
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
    const { user, plants, userPlants } = this.state;
    let plantToWater: Plant;
    const getDates = (userPlant: UserPlant): JSX.Element => {
        plants.forEach((plant: Plant) => {
          if (userPlant.plant_Id === plant.id) {
            plantToWater = plant;
          }
        });
      return (
        <div>
          <h2>{this.formatDate(userPlant.next_Watered_Date)}</h2>
          <div className="d-flex justify-content-center flex-wrap">
            <PlantCard
              key={plantToWater.id}
              plant={plantToWater}
              user={user}
              homePage={true}
              water={true}
              userPlant={userPlant}
              onUpdate={this.onUpdate}
            />
          </div>
        </div>
      );
    };
    const dates = userPlants.map(getDates);
    return (
      <div>
        <h1>Watering</h1>
        <div>{dates}</div>
      </div>
    );
  }
}
export default Watering;
