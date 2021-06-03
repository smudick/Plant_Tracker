import {PlantProps} from '../../Helpers/Interfaces/PlantInterfaces';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import one from '../../Images/1.jpg';

export const PlantCard = ({plant}: PlantProps): JSX.Element => (
    <div>
        <Card>
        <CardImg top width="100%" src={one} alt={plant.common_Name} />
        <CardBody>
          <CardTitle tag="h5">{plant.common_Name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{plant.scientific_Name}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
)
