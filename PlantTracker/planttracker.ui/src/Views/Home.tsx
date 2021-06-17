import React, { Component } from "react";
import PlantData from "../Helpers/Data/PlantData";
import { Plant } from "../Helpers/Interfaces/PlantInterfaces";
import PlantCard from "../Components/Cards/PlantCard";
import { User } from "../Helpers/Interfaces/UserInterface";
import UserData from "../Helpers/Data/UserData";

type HomeProps = {
  user: User;
};
class Home extends Component<HomeProps> {
  state = {
    plants: [],
    user: this.props.user.user,
  };

  componentDidMount(): void {
    if (this.state.user) {
      PlantData.getPlantsForSingleUser(this.state.user.id).then(
        (plantResponse: Plant[]) => {
          this.setState({
            plants: plantResponse,
            // user: response
          });
        }
      );
    }
    // });
  }
  render(): JSX.Element {
    const { plants, user } = this.state;
    const plantCard = (plant: Plant): JSX.Element => {
      return (
        <PlantCard
          key={plant.id}
          plant={plant}
          user={user}
          homePage={true}
          water={false}
        />
      );
    };
    const cards = plants?.map(plantCard);
    return (
      <div>
        {user && (
          <div>
            <h1 className="mt-4">My Plants</h1>
            <div className="d-flex flex-wrap justify-content-center">
              {cards}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Home;
