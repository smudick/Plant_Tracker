import React, { Component } from "react";
import PlantData from '../Helpers/Data/PlantData';
import {Plant} from '../Helpers/Interfaces/PlantInterfaces'
import PlantCard from '../Components/Cards/PlantCard';
import {User} from '../Helpers/Interfaces/UserInterface';
import UserData from "../Helpers/Data/UserData";

type BrowseState = {
    plants?: Plant[];
    user?: User;
}
class Browse extends Component {
    state: BrowseState = {
        plants: [],
        user: null,
    }

    componentDidMount(): void {
        UserData.getUserById(1).then((response: User) => {
            PlantData.getAllPlants().then((plantResponse: Plant[]) => {
                this.setState({
                    plants: plantResponse,
                    user: response
                });
            });
        });
    }
    render(): JSX.Element {
        const {plants, user} = this.state;
        const plantCard = (plant: Plant): JSX.Element => {
            return <PlantCard key={plant.id} plant={plant} user={user} homePage={false} water={false}/>
        };
        const cards = plants?.map(plantCard);
        return (
            <div>
                <h1 className="mt-4">Browse</h1>
                <div className="d-flex flex-wrap justify-content-center">
                {cards}
                </div>
            </div>
        )
    }
}
export default Browse;