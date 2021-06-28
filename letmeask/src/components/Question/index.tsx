import { ReactNode } from 'react'
import classnames from 'classnames'

import './question.scss'

type QuestionProps ={
    content:string;
    author:{
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?:boolean;
    isHighlighted?:boolean;
}

export function Questions({
    content,
    author,
    isAnswered=false,
    isHighlighted=false,
    children
}: QuestionProps){
    return(
        <div className={classnames(
            'question',
            {answered:isAnswered},
            {highlighted:isHighlighted && !isAnswered}
        )}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div className="">
                    {children}
                </div>
            </footer>
        </div>
    )
}