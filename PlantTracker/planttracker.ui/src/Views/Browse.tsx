import { Component } from "react";
import PlantData from "../Helpers/Data/PlantData";
import { Plant } from "../Helpers/Interfaces/PlantInterfaces";
import PlantCard from "../Components/Cards/PlantCard";
import { User, UserProps } from "../Helpers/Interfaces/UserInterface";
import UserData from "../Helpers/Data/UserData";
import { PlantType } from "../Helpers/Interfaces/PlantType";
import { CustomInput, Label, Form } from "reactstrap";

type BrowseState = {
  plants?: Plant[];
  selectedPlants?: Plant[];
  user?: User;
  types: PlantType[];
};
class Browse extends Component<UserProps> {
  state: BrowseState = {
    plants: [],
    selectedPlants: [],
    user: this.props.user.user,
    types: [],
  };

  componentDidMount(): void {
    if (this.state.user) {
      UserData.getUserById(this.state.user.id).then((response: User) => {
        PlantData.getAllPlants().then((plantResponse: Plant[]) => {
          PlantData.getAllTypes().then((typeResponse: PlantType[]) => {
            this.setState({
              plants: plantResponse,
              selectedPlants: plantResponse,
              user: response,
              types: typeResponse,
            });
          });
        });
      });
    }
  }
  statePlants: Plant[] = [];
  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked === true && this.state.plants) {
      const filteredPlants = this.state.plants?.filter(
        (plant) => plant.type === parseInt(e.target.value)
      );
      this.statePlants?.push(...filteredPlants);
      this.setState({
        selectedPlants: this.statePlants,
      });
    } else if (e.target.checked === false && this.state.plants) {
      const unfilteredPlants = this.state.plants?.filter(
        (plant) => plant.type === parseInt(e.target.value)
      );
      let counter = 0;
      let index = 0;
      this.statePlants?.forEach((statePlant) => {
        unfilteredPlants.forEach((unfilteredPlant) => {
          if (statePlant === unfilteredPlant) {
            counter++;
            index = this.statePlants.indexOf(statePlant) - counter + 1;
          }
        });
      });
      this.statePlants.splice(index, counter);
      this.setState({
        selectedPlants: this.statePlants,
      });
    }
    if (this.statePlants.length === 0) {
      this.setState({
        selectedPlants: this.state.plants,
      });
    }
  };
  render(): JSX.Element {
    const { plants, user, types, selectedPlants } = this.state;
    const plantCard = (plant: Plant): JSX.Element => {
      return (
        <PlantCard
          key={plant.id}
          plant={plant}
          user={user}
          homePage={false}
          water={false}
        />
      );
    };
    const cards = selectedPlants?.map(plantCard);
    const filterButton = (plantType: PlantType): JSX.Element => {
      return (
        <CustomInput
          type="checkbox"
          className="check"
          id={plantType.id}
          label={plantType.type}
          value={plantType.id}
          selected={false}
          onChange={this.handleChange}
        />
      );
    };
    const filterButtons = types?.map(filterButton);
    return (
      <div className="d-flex align-items-center flex-column">
        <h1 className="mt-4">Browse</h1>
        <div className="filterContainer">
            <h5>Filter by plant type</h5>
            {this.state.types.length && (
              <div className="filterButtons">
                {filterButtons}
              </div>
            )}
        </div>
        <div className="d-flex flex-wrap justify-content-center">{cards}</div>
      </div>
    );
  }
}
export default Browse;
