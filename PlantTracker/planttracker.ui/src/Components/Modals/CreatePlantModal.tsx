import { useState } from 'react';
import { Modal } from 'reactstrap';
import {User} from '../../Helpers/Interfaces/UserInterface';
import CreatePlantForm from '../Forms/CreatePlantForm';

const CreatePlantModal = ({user}: any): JSX.Element => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div>
          <button onClick={toggle}>Create Custom Plant</button>
           <Modal isOpen={modal} toggle={toggle}>
           <CreatePlantForm user={user}/>
          </Modal>
        </div>
      );
}
export default CreatePlantModal;