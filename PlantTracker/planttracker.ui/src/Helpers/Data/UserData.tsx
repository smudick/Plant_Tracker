import axios from 'axios';
import { BaseURL } from '../config.json';
import { User } from '../Interfaces/UserInterface';

const usersUrl = `${BaseURL}/users`;

const getUserById = (id: number): Promise<User> => new Promise((resolve, reject) => {
    axios.get(`${usersUrl}/${id}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error))
});

const getUserByFirebaseUid = (firebase_Uid: string): Promise<User> => new Promise((resolve, reject) => {
    axios.get(`${usersUrl}/firebase/${firebase_Uid}`).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
});

const addNewUser = (user: User): Promise<User> => new Promise((resolve, reject) => {
    axios.post(`${usersUrl}`, user).then((response) => {
        resolve(response.data);
    }).catch((error) => reject(error));
})

const UserData = {
    getUserById,
    getUserByFirebaseUid,
    addNewUser
}

export default UserData;