import { Component } from "react";
import {
  Plant,
  UserPlant,
} from "../Helpers/Interfaces/PlantInterfaces";
import {UserProps} from '../Helpers/Interfaces/UserInterface';
import PlantData from "../Helpers/Data/PlantData";
import PlantCard from "../Components/Cards/PlantCard";

class Watering extends Component<UserProps> {
  state = {
    plants: [],
    userPlants: [],
    user: this.props.user.user,
  };
  componentDidMount(): void {
    if (this.state.user) {
      PlantData.getPlantsForSingleUser(this.state.user.id).then((response: Plant[]) => {
        PlantData.getUserPlants(this.state.user.id).then((userPlantResponse) => {
          this.setState({
            plants: response,
            userPlants: userPlantResponse,
          });
        });
      });
    }
  }

  onUpdate(): void {
    PlantData.getPlantsForSingleUser(this.state.user.id).then((response: Plant[]) => {
      PlantData.getUserPlants(this.state.user.id).then((userPlantResponse) => {
        this.setState({
          plants: response,
          userPlants: userPlantResponse,
        });
      });
    });
  }
  waterPlant = (userPlant: UserPlant): void => {
    PlantData.waterPlant(userPlant).then(() => {
      this.onUpdate();
    });
  };

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
    const realData: any = {};
    userPlants.forEach((userPlant: UserPlant) => {
      const betterDate = this.formatDate(userPlant.next_Watered_Date);
      if (!realData[betterDate]) {
        realData[betterDate] = [];
      }

      const plant = plants.find(
        (plant: Plant) => userPlant.plant_Id === plant.id
      );
      const plantData = { userPlant, plant };

      realData[betterDate].push(plantData);
    });

    const createDateBlock = (date: string, plants: any) => {
      const plantCards = plants.map((plant: any) => {
        return (
          <PlantCard
            key={plant.plant.id}
            plant={plant.plant}
            user={user}
            homePage={true}
            water={true}
            userPlant={plant.userPlant}
            waterPlant={this.waterPlant}
          />
        );
      });
      return (
        <div className="d-flex flex-column align-items-center">
          <h2 className="date">{date}</h2>
          <div className="waterCards">
            {plantCards}
          </div>
        </div>
      );
    };
    const dates = Object.entries(realData).map(([date, plants]) =>
      createDateBlock(date, plants)
    );
    return (
      <div>
        <h1 className="m-4">Watering</h1>
        <div className="m-4">{dates}</div>
      </div>
    );
  }
}
export default Watering;
