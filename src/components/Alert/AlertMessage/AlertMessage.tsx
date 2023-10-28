import { useState } from "react";
import AlertGenerator from "../AlertGenerator/AlertGenerator";

const AlertMessage  = () => {
const[inputValue,setInputValue]=useState('');

const [message,setMessage]=useState('');

const [showAlert,setShowAlert] = useState(false);

const handleClick = () => {
    if(inputValue.trim() !== ''){
        setShowAlert(true);
        setMessage(inputValue);
    }else{
        setShowAlert(false);
    }
}

    return ( 
        <div className="m-3">

        <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
        <button onClick={handleClick}> Enviar</button>

        {showAlert && <AlertGenerator message={message}/>}

        </div>
    )
}
 
export default AlertMessage ;