import { Component } from "react";
import PlantData from "../Helpers/Data/PlantData";
import { Plant } from "../Helpers/Interfaces/PlantInterfaces";
import PlantCard from "../Components/Cards/PlantCard";
import { User } from "../Helpers/Interfaces/UserInterface";
import UserData from "../Helpers/Data/UserData";
import { PlantType } from "../Helpers/Interfaces/PlantType";
import { CustomInput, Label, Form, FormGroup } from "reactstrap";

type BrowseState = {
  plants?: Plant[];
  user?: User;
  types: PlantType[];
};
class Browse extends Component {
  state: BrowseState = {
    plants: [],
    user: null,
    types: [],
  };

  componentDidMount(): void {
    UserData.getUserById(1).then((response: User) => {
      PlantData.getAllPlants().then((plantResponse: Plant[]) => {
        PlantData.getAllTypes().then((typeResponse: PlantType[]) => {
          this.setState({
            plants: plantResponse,
            user: response,
            types: typeResponse,
          });
        });
      });
    });
  }
  filter = () => {
      console.log('filter');
  }
  render(): JSX.Element {
    const { plants, user } = this.state;
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
    const cards = plants?.map(plantCard);
    return (
      <div className="d-flex align-items-center flex-column">
        <h1 className="mt-4">Browse</h1>
        <Form onSubmit={() => this.filter()}>
          <FormGroup>
            <Label for="exampleCheckbox">Filter</Label>
                {this.state.types.length && 
            <div className="d-flex flex-column align-items-start">
              <CustomInput
                type="checkbox"
                id={this.state.types[0].id}
                label={this.state.types[0].type}
                />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox2"
                label="Or this one"
                />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox3"
                label="But not this disabled one"
                />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox4"
                label="Can't click this label to check!"
                />
            </div>
            }
          </FormGroup>
          <button>Filter</button>
        </Form>
        <div className="d-flex flex-wrap justify-content-center">{cards}</div>
      </div>
    );
  }
}
export default Browse;
