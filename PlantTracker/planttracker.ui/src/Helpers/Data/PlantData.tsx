import axios from 'axios';
import { BaseURL } from '../config.json';
import { Plant } from '../Interfaces/PlantInterfaces';

const plantUrl = `${BaseURL}/Plants`;

const getAllPlants = (): Promise<Plant> => new Promise((resolve, reject) => {
    axios.get(`${plantUrl}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
});

const PlantData = {
    getAllPlants
}
export default PlantData;