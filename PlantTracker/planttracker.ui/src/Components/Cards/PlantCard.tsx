import {PlantProps} from '../../Helpers/Interfaces/PlantInterfaces';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

export const PlantCard = ({plant}: PlantProps): JSX.Element => (
    <div>
        <Card className="plant-card">
        <CardImg className="plant-image" src={`${plant.image_Url}`} alt={plant.common_Name} />
        <CardBody>
          <CardTitle tag="h5">{plant.common_Name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{plant.scientific_Name}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
)
