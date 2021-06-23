//Link que ajuda a fazer as rotas da nossa aplicação
import { Link } from 'react-router-dom'

//meu contexto de login
import { useAuth } from '../hooks/useAuth'

//Minhas Imagens
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg'

//Meus estilos
import '../styles/auth.scss'

//componente button
import { Button } from '../components/Button'


export function NewRoom(){

    //const {user} = useAuth();

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
                    <form action="">
                        <input 
                            type="text" 
                            placeholder='Nome da sala'
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