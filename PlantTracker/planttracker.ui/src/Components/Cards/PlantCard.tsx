import { PlantProps } from "../../Helpers/Interfaces/PlantInterfaces";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";
import PlantData from '../../Helpers/Data/PlantData';
import {User} from '../../Helpers/Interfaces/UserInterface';
import {Plant} from '../../Helpers/Interfaces/PlantInterfaces';

const addPlant = (user: User, plant: Plant): void => {
    const userPlant = {
        User_Id : user.id,
        Plant_Id: plant.id,
        User_Water_Time: plant.watering_Interval,
    }
    PlantData.addPlantToUser(userPlant)
}

export const PlantCard = ({ plant, user }: PlantProps): JSX.Element => (
  <div>
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
        <button onClick={() => addPlant(user, plant)}>Add Plant</button>
      </CardBody>
    </Card>
  </div>
);
