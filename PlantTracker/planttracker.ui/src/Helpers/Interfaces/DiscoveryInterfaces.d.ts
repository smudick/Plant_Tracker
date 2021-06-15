import {Plant} from './PlantInterfaces'
import {User} from './UserInterface'

declare module "DiscoveryTypes" {
    interface DiscoveryProps {
      plants: Plant[];
      user: User;
    }
  }
  
  export { DiscoveryProps };