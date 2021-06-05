import { PlantProps } from "../../Helpers/Interfaces/PlantInterfaces";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

const addPlant = ()

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
        {user === undefined && <button>Add Plant</button>}
      </CardBody>
    </Card>
  </div>
);
