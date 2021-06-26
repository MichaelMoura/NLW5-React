import { ReactNode } from 'react';
import '../styles/question.scss';
import cs from 'classnames';

//criando a tipagem das propiedades que meu componente recebe
type QuestionProps = {
    key: string,
    content: string,
    author : {
        name: string, 
        avatar: string,
    },
    children?: ReactNode,
    isAnswered?: boolean,
    isHighlighted?: boolean,
}

export function Question({content,author,children,isAnswered=false,isHighlighted=false}:QuestionProps){
    
    return(
        <div className={cs('question',
                        {answered:isAnswered},
                        {highLighted:isHighlighted && !isAnswered},
                        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}