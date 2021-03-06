import { useHistory } from 'react-router' 

import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'
import googleIconImg from '../assets/google-icon.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home(){

    const history = useHistory();
    const {user,signInWithGoogle} = useAuth();

    //vai armazenar o código da sala que o usuário digitou
    const [roomCode,setRoomCode] = useState('');


    async function handleCreateRoom(){
        if(!user){
           await signInWithGoogle();
        }
        history.push('/rooms/new')
    };

    async function handleJoinRoom(event:FormEvent){
        event.preventDefault();

        if(roomCode.trim() ===''){
            return;
        }

        //Eu quero buscar o código da sala que eu quero buscar
        //o .get vai buscar o registro no banco de dados
        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()){
            alert('Room does not exist.')
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed')
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>Ou entre em uma sala</div>
                    <form action=""onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder='Digite o código da sala'
                            onChange={event=>setRoomCode(event.target.value)}
                            value={roomCode}
                        />

                        <Button type='submit'>
                            Entrar na Sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}