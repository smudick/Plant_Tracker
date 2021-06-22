import { Component } from "react";
import { PlantProps, UserPlant } from "../../Helpers/Interfaces/PlantInterfaces";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import PlantData from "../../Helpers/Data/PlantData";
import { User } from "../../Helpers/Interfaces/UserInterface";
import { Plant } from "../../Helpers/Interfaces/PlantInterfaces";

export default class PlantCard extends Component<PlantProps> {
  state = {
    plant: this.props.plant || null,
    user: this.props.user,
    added: false,
    homePage: this.props.homePage,
    water: this.props.water,
    userPlant: this.props.userPlant || null
  };
  componentDidMount = (): void => {
    if (this.state.user && this.state.userPlant) {

      if (this.state.plant === null) {
        PlantData.getPlantById(this.state.userPlant.plant_Id).then((response) => {
          this.setState({
            plant: response
          })
        })
      }
    }
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

  render(): JSX.Element {
    const { plant, user, added, homePage, water, userPlant } = this.state;
    return (
      <>
      {plant && (

        <div>
        <Card className="plant-card">
          {added && (
            <div className="cardAlert">
              <p>This plant has been added to your home!</p>
            </div>
          )}
          <Link
          to={{
            pathname: "/details",
            state: {
              plant: plant,
              user: user,
              userPlant: userPlant,
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
            <CardTitle tag="h3">{plant.common_Name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {plant.scientific_Name}
            </CardSubtitle>
            {(userPlant && (
              <CardSubtitle tag="h5" className="m-3">
                {userPlant.name}
              </CardSubtitle>
            ))}
            {((homePage === false) && (user !== false)) && (
              <button
              className="addPlantButton"
              onClick={() => this.addPlant(user, plant)}
              >
                Add Plant
              </button>
            )}
            {water && (
              <button
              className="waterButton"
              onClick={() => this.props.waterPlant(this.props.userPlant)}
              >
                Water Plant
              </button>
            )}
          </CardBody>
        </Card>
      </div>
      )}
      </>
    );
  }
}
