import axios from 'axios';
import { BaseURL } from '../config.json';
import { Plant, UserPlant } from '../Interfaces/PlantInterfaces';
import {PlantType} from '../Interfaces/PlantType';

const plantUrl = `${BaseURL}/Plants`;
const plantTypeUrl = `${BaseURL}/Types`;
const userPlantUrl = `${BaseURL}/user-plants`

const getAllPlants = (): Promise<Plant> => new Promise((resolve, reject) => {
    axios.get(`${plantUrl}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
});

const getPlantType = (id: number): Promise<PlantType> => new Promise((resolve, reject) => {
    axios.get(`${plantTypeUrl}/${id}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
})

const getPlantsForSingleUser = (userId: number): Promise<Plant> => new Promise((resolve, reject) => {
    axios.get(`${plantUrl}/user/${userId}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
});

const getUserPlants = (userId: number) : Promise<UserPlant> => new Promise((resolve, reject) => {
    axios.get(`${userPlantUrl}/user/${userId}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
});

const updateUserPlant = (userPlant: UserPlant) : Promise<UserPlant> => new Promise((resolve, reject) => {
    axios.put(`${userPlantUrl}/update`, userPlant).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
})
const search = (searchTerm: string) : Promise<Plant> => new Promise((resolve, reject) => {
    axios.get(`${plantUrl}/search/${searchTerm}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
})

const addPlantToUser = (userPlant: UserPlant) : Promise<UserPlant> => new Promise((resolve, reject) => {
    axios.post(`${userPlantUrl}`, userPlant).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
})
 
const PlantData = {
    getAllPlants,
    getPlantType,
    getPlantsForSingleUser,
    getUserPlants,
    updateUserPlant,
    search,
    addPlantToUser,
}
export default PlantData;