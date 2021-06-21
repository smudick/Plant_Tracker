import { useState } from 'react';
import { Modal } from 'reactstrap';
import {User} from '../../Helpers/Interfaces/UserInterface';
import CreatePlantForm from '../Forms/CreatePlantForm';

const CreatePlantModal = ({user}: User): JSX.Element => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div className="d-flex justify-content-center flex-row">
          <button className="addPlantButton" onClick={toggle}>Create Custom Plant</button>
           <Modal contentClassName="createPlantModal" isOpen={modal} toggle={toggle}>
           <CreatePlantForm user={user}/>
          </Modal>
        </div>
      );
}
export default CreatePlantModal;