import React, { Component } from "react";
import {Plant, PlantProps, UserPlant} from '../Helpers/Interfaces/PlantInterfaces'
import {PlantType} from '../Helpers/Interfaces/PlantType';
import PlantData from '../Helpers/Data/PlantData';
import {User} from '../Helpers/Interfaces/UserInterface'
import {Button} from 'reactstrap';
import UpdatePlantModal from '../Components/Modals/UpdatePlantModal';

type SinglePlantState = {
    plant?: Plant,
    type: PlantType,
    user: User,
    userPlant: UserPlant
}

class SinglePlant extends Component<PlantProps> {

    state : SinglePlantState = {
        plant: this.props.location.state.plant,
        type: "",
        user:  this.props.location.state.user,
        userPlant: {},
    }

    componentDidMount = (): void => {
        PlantData.getPlantType(this.state.plant.type).then((response) => {
            this.setState({
                type: response.type
            })
        })
        PlantData.getUserPlants(this.state.user.id).then((response) => {
            for (let i=0; i<response.length; i++) {
                if (response[i].plant_Id === this.state.plant.id) {
                    this.setState({
                        userPlant: response[i]
                    })
                }
            }
        })
    } 
    onUpdate = (): void => {
        PlantData.getUserPlants(this.state.user.id).then((response) => {
            for (let i=0; i<response.length; i++) {
                if (response[i].plant_Id === this.state.plant.id) {
                    this.setState({
                        userPlant: response[i]
                    })
                }
            }
        })
    }

    shadeCalc = (shade: number) : string => {
        switch (shade) {
            case 1:
                return "Full Sun";
            case 2: 
                return "Mostly Sun";
            case 3: 
                return "Partial Sun";
            case 4: 
                return "Mostly Shade";
            case 5: 
                return "Full Shade";
            default:
                return "unknown";
        }       
    }
    waterIndicatorCalc = (soil: number) : string => {
        switch (soil) {
            case 1:
                return "Do not water until soil is completely dry";
            case 2: 
                return "Water when soil is mostly dry";
            case 3: 
                return "Water when the soil is somewhat dry";
            case 4: 
                return "Soil should never be dry";
            case 5: 
                return "High";
            default:
                return "unknown";
        }       
    }
    moistureCalc = (moisture: number) : string => {
        switch (moisture) {
            case 1:
                return "Low";
            case 2: 
                return "Low-Med";
            case 3: 
                return "Medium";
            case 4: 
                return "High-Med";
            case 5: 
                return "High";
            default:
                return "unknown";
        }       
    }
    bloomCalc = (bloom: string) : string => {
        if (bloom === "N/A") {
            return "This plant does not bloom"
        } else {
            return bloom;
        }
    }

    render(): JSX.Element {
        const {plant, type, userPlant, user} = this.state
        return (
            <div className="d-flex flex-column m-2">
                    <h1>{plant.common_Name}</h1>
                    <h4><em>{plant.scientific_Name}</em></h4>
                    <h5>{type}</h5>
                    <img src={plant.image_Url}></img>
                    <div className="d-flex justify-content-center">

                <div className="m-3">
                    <h2>Care Recommendations</h2>
                    <p>Soil pH: {plant.ph_Soil}</p>
                    <p>Amount of Sun: {this.shadeCalc(plant.shade)}</p>
                    <p>Moisture Usage: {this.moistureCalc(plant.moisture_Use)}</p>
                    <p>Soil watering indicator: {this.waterIndicatorCalc(plant.soil_Watering_Indicator)}</p>
                </div>
                <div className="m-3">
                    <h2>Plant Information</h2>
                    <p>Bloom color: {this.bloomCalc(plant.bloom)}</p>
                    <p>Days between each watering: {userPlant.user_Water_Time}</p>
                    <p>Last watered date: {userPlant.last_Watered_Date}</p>
                    <p>Next scheduled watering date: {userPlant.next_Watered_Date}</p>
                    <p>Notes: {userPlant.notes}</p>
                    <UpdatePlantModal user={user} plant={plant} userPlant={userPlant} onUpdate={this.onUpdate}>Edit</UpdatePlantModal>
                </div>
                    </div>
            </div>
        )
    }
}
export default SinglePlant;