import {PlantProps} from '../../Helpers/Interfaces/PlantInterfaces';

export const PlantCard = ({plant}: PlantProps): JSX.Element => (
    <div>
        <h1>{plant.common_Name}</h1>
        <h2>{plant.scientific_Name}</h2>
    </div>
)
