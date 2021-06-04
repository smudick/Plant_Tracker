import React, { Component } from "react";
import PlantData from '../Helpers/Data/PlantData';
import {Plant} from '../Helpers/Interfaces/PlantInterfaces'
import {PlantCard} from '../Components/Cards/PlantCard';

type HomeState = {
    plants?: Plant[];
}
class Home extends Component {
    state: HomeState = {
        plants: []
    }

    componentDidMount(): void {
        PlantData.getAllPlants().then((response: Plant[]) => {
            this.setState({
                plants: response
            });
        });
    }
    render(): JSX.Element {
        const {plants} = this.state;
        const plantCard = (plant: Plant): JSX.Element => {
            return <PlantCard key={plant.id} plant={plant} />
        };
        const cards = plants?.map(plantCard);
        return (
            <div>
                <h1>Home</h1>
                <div className="d-flex flex-wrap justify-content-center m-4">
                {cards}
                </div>
            </div>
        )
    }
}
export default Home;