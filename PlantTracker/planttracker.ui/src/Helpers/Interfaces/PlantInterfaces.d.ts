import {PlantType} from './PlantType';
declare module "PlantTypes" {
  interface Plant {
    Id: number;
    Scientific_Name: string;
    Common_Name: string;
    Shade: number;
    Moisture_Use: number;
    Soil_Watering_Indicator: number;
    Max_Width: number;
    Toxic_Dogs: boolean;
    Toxic_Cats: boolean;
    Type: Array<PlantType>;
    Flowering: boolean;
    Hanging: boolean;
    Air_Purifying: boolean;
    Max_Height: number;
    Ph_Soil: string;
    Bloom: string;
    Watering_Interval: number;
    User_Id: number;
    Image_Url: string;
  }
  type PlantProps = {
      plant: Plant
  }
}
export {Plant, PlantProps}
