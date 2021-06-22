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
  interface UserPlant {
      Id: number;
      User_Id: number;
      Plant_Id: number;
      Last_Watered_Date: Date;
      Next_Watered_Date: Date;
      Notes: String;
      User_Water_Time: number;
      Name: string;
  }
  type PlantProps = {
      plant: Plant,
      location: RouteComponentProps["location"],
      user: User
  }
  type UserPlantProps = {
      plant: Plant,
      userPlant: UserPlant,
      user: User,
      onUpdate?: () => void;
  }
}
export {Plant, PlantProps, UserPlant, UserPlantProps}
