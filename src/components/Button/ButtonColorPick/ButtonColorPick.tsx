import { useState } from 'react'
import MyModalProps from '../MyModalProps/MyModalProps';
import { Button } from 'react-bootstrap';

export const ButtonColorPick = () => {
    const[buttonColor,setButtonColor]=useState("#3d7c40");

    const[showModal,setShowModal]=useState(false);

    const handleColorChange=(color:string) => {
        setButtonColor(color);
    }

    const handleShowModal = () =>{
        setShowModal(true);
    }

    

  return (
    <div className='m-3'>
        <h2>Botonnn</h2>

        <Button variant="primary" style={{backgroundColor: buttonColor}} onClick={handleShowModal}> Cambiar Color
        </Button>

        {showModal && <MyModalProps 
        show={showModal}
        onHide={() => setShowModal(false)}
        handleColorChange={handleColorChange}/>    
        }

    </div>
  )
}
export default ButtonColorPick