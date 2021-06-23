import { useState } from "react";


const botao = ()=> {
    const [counter,setCounter] = useState(0);

    function incremental(){
        setCounter(counter+1)
    }


    return(
        <button onClick={incremental}>{counter}</button>
    )
}

export default botao;