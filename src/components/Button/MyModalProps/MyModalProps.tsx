import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type MyModalProps = {
    show: boolean;
    onHide:() => void;
    handleColorChange:(color:string) => void;
}

export const MyModalProps = ({show,onHide,handleColorChange}:MyModalProps) => {

    const[selectedcolor,setselectedcolor]=useState('#FFF');

    const handleColorPickerChange=(event: React.ChangeEvent<HTMLInputElement>) =>{
        setselectedcolor(event.target.value);
    }

    const handleAcceptClick=() => {
        handleColorChange(selectedcolor);
        onHide();
    }

  return (
    <Modal show={show} onHide={onHide} centered0 backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title> Cambian Kolor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form.Label htmlFor="exampleColorInput"> Elije un color</Form.Label>
            <Form.Control
            type='color'
            id='exampleColorInput'
            defaultValue="#FFF"
            title="Elije un color"
            onChange={handleColorPickerChange}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}> Cancelar</Button>
            <Button variant="primaty" onClick={handleAcceptClick}> Aceptar</Button>
        </Modal.Footer>

    </Modal>
  )
}
export default MyModalProps;