//Link que ajuda a fazer as rotas da nossa aplicação
import { Link, useHistory } from 'react-router-dom'

//meu contexto de login
import { useAuth } from '../hooks/useAuth'

//Minhas Imagens
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'

//Meus estilos
import '../styles/auth.scss'

//componente button
import { Button } from '../components/Button'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function NewRoom(){

    const {user} = useAuth();
    const history = useHistory()
    const [newRoom,setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent){
        //impede da página recarregar 
        event.preventDefault()

        //vai retirar os espaços do campo de texto
        if(newRoom.trim()===''){
            return 
        }
        

        //vai procurar no banco de dados uma tabela rooms
        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Crie uma nova sala</h2>
                    <form action="" onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder='Nome da sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />

                        <Button type='submit'>
                            Criar Sala 
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link></p>
                </div>
            </main>
        </div>
    )
}