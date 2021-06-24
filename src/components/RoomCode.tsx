import copyImg from '../assets/copy.svg'

import '../styles/room-code.scss';

type RoomCodeProps={
    code: string;
}

export function RoomCode(props:RoomCodeProps){   

    //Vai fazer a função de quando o usuário clicar no botão, ele vai copiar o código para área de trabalho
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }

    return(
        <button className='room-code' onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>sala #{props.code}</span>
        </button>
    )
}