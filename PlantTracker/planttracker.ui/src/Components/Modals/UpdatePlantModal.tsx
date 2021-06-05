import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import {UserPlantProps} from '../../Helpers/Interfaces/PlantInterfaces';
import UpdatePlantForm from '../Forms/UpdatePlantForm';

const UpdatePlantModal = ({user, plant, userPlant, onUpdate}: UserPlantProps): JSX.Element => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div>
          <button onClick={toggle}>Update Plant</button>
           <Modal isOpen={modal} toggle={toggle}>
                <UpdatePlantForm user={user} plant={plant} userPlant={userPlant} onUpdate={onUpdate}/>
          </Modal>
        </div>
      );
}
export default UpdatePlantModal;