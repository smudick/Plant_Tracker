import { Component } from "react";
import { PlantProps } from "../../Helpers/Interfaces/PlantInterfaces";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import PlantData from "../../Helpers/Data/PlantData";
import { User } from "../../Helpers/Interfaces/UserInterface";
import { Plant, UserPlant } from "../../Helpers/Interfaces/PlantInterfaces";

export default class PlantCard extends Component<PlantProps> {
  state = {
    plant: this.props.plant,
    user: this.props.user,
    added: false,
    homePage: this.props.homePage,
    water: this.props.water,
    onUpdate: this.props.onUpdate
  };

  addPlant = (user: User, plant: Plant): void => {
    const userPlant = {
      User_Id: user.id,
      Plant_Id: plant.id,
      User_Water_Time: plant.watering_Interval,
    };
    PlantData.addPlantToUser(userPlant);
    this.setState({
        added: true
    })
    setTimeout(() => this.setState({ added: false }), 3000);
  };

  waterPlant = (userPlant : UserPlant): void => {
    PlantData.waterPlant(userPlant).then(() => {
      if (this.state.onUpdate) {
        this.state.onUpdate();
      }
    })
  }
  
  render(): JSX.Element {
    const { plant, user, added, homePage, water} = this.state;
    return (
      <div>
          {added && 
            <h2>This plant has been added to your home!</h2>
          }
        <Card className="plant-card">
          <Link
            to={{
              pathname: "/details",
              state: {
                plant: plant,
                user: user,
              },
            }}
          >
            <CardImg
              className="plant-image"
              src={`${plant.image_Url}`}
              alt={plant.common_Name}
            />
          </Link>
          <CardBody>
            <CardTitle tag="h5">{plant.common_Name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {plant.scientific_Name}
            </CardSubtitle>
            {homePage===false&& 
            <button onClick={() => this.addPlant(user, plant)}>
              Add Plant
            </button>
            }
            {water && 
              <button onClick={() => this.waterPlant(this.props.userPlant)}>
                Water Plant
              </button>
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}
