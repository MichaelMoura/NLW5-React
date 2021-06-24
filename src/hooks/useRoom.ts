import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likes: Record<string, {
        authorId: string,
    }>
}>

type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likeCount: number,
    likeId: string | undefined,
}

export function useRoom(roomId:string){
    
    const {user} = useAuth();
    const [questions,setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('');

    useEffect(()=>{
        //Vai consultar e pegar os dados no meu banco de dados
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.on('value',room=>{
            //vamos pegar o valor dessa questão
            const databaseRoom = room.val();

            const firebaseQuestions:FirebaseQuestions = databaseRoom.questions;

            //O object entries vai mudar meu objeto para um array por exemplo [[name,michael],[old:20]]
            //Nesse caso temos aquela tipagem estranha de um objeto e um json, então vamos usar a desestruturação
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=>{
                return{
                    id:key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ??{}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key,like])=>like.authorId === user?.id)?.[0],
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })

        return () =>{
            roomRef.off('value');
        }
    },[roomId, user?.id])


    return{questions, title}
}