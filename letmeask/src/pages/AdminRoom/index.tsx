import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Questions } from '../../components/Question'
import { useRoom } from '../../hoocks/useRoom';

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import './styles.scss'
import { database } from '../../service/firebase';


type RoomParams = {
    id: string
}

export function AdminRoom() {

    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);
    const history = useHistory();

    //Encerrar sala
    async function handleEndRoom() {
        await await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }

    //Marcar como respondida
    async function handeleCheckQuestionAsAnwered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    //Destaque da pergunta
    async function handeleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    //Remover pergunta
    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div className="">
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}  >Encerrar sala</Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas(s)</span>}
                </div>


                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Questions
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handeleCheckQuestionAsAnwered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handeleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque á pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Questions>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}