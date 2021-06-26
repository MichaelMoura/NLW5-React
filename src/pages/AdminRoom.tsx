//hooks do node_modules
import { useParams } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';

//minhas imagens
import logoImg from '../assets/logo.svg';
import deleteImg from '../assets/delete.svg';
import checkImg from '../assets/check.svg';
import answerImg from '../assets/answer.svg';

//meus componentes
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';


//meus hooks
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';


//meu banco de dados
import { database } from '../services/firebase';

import '../styles/room.scss';
import { useHistory } from 'react-router-dom';

type RoomParams = {
    id: string
}

export function AdminRoom(){

    //navegar para outras páginas
    const history = useHistory();

    //meus hooks
    const {user} = useAuth();

    //a propriedade da sala que pegamos pela url
    const params = useParams<RoomParams>();
    
    //aqui falamos para o nosso estado que ele armazena um array de question
    const [newQuestion,setNewQuestion] = useState('');

    //o id da minha sala
    const roomId = params.id;

    

    const {questions,title} = useRoom(roomId);

     

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/');
    }

    async function handleCheckQuestionAsAnswered(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })         
    }

    async function handleHighlightQuestion(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        })  
    }

    async function handleDeleteQuestion(questionId:string){
        if(window.confirm('Tem certeza que você deseja exculir esta pergunta')){
            const questionRef = await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return(
       <div id='page-room'>
           <header>
               <div className="content">
                   <img src={logoImg} alt="letmeask" />
                   <div>
                        <RoomCode code={params.id}/>
                        <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
                   </div>
               </div>
           </header>

           <main>
               <div className="room-title">
                   <h1>Sala {title}</h1>
                   {questions.length > 0 && <span>{questions.length} perguntas</span>}
               </div>

               <div className='question-list'>
                    {questions.map(question=>{
                            return(<Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                                >

                                {!question.isAnswered && (
                                <>
                                    <button
                                        type='button'
                                        onClick={()=> handleCheckQuestionAsAnswered(question.id)}
                                    >
                                        <img src={checkImg} alt="Marcar Pergunta como respondida" title='Marcar Pergunta como respondida'/>
                                    </button>
    
                                    <button
                                        type='button'
                                        onClick={()=> handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="Dar destaque a pergunta" title='Dar destaque a pergunta'/>
                                    </button>
                                </>
                                )}

                                <button
                                  type='button'
                                  onClick={()=> handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta" title='Remover Pergunta'/>
                                </button>
                            </Question>)
                    })}
               </div>
           </main>
       </div>
    )
}