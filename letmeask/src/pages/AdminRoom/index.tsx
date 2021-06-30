import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Questions } from '../../components/Question'
import { useRoom } from '../../hoocks/useRoom';

import Modal from 'react-modal';

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'
import close from '../../assets/images/close.svg'

import './styles.scss'
import { database } from '../../service/firebase';


type RoomParams = {
    id: string
}

export function AdminRoom() {

    const [modalIsOpen, setIsOpen] = useState(false);

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

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    function closeModal() {
        setIsOpen(false);
    }

    //Remover pergunta
    async function handleDeleteQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
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

                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    contentLabel="Example Modal"
                                    style={{
                                        overlay: {
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)'
                                        },
                                        content: {
                                            width: '590px',
                                            height: '362px',
                                            marginLeft: '25%',
                                            marginTop: '8%',
                                            background: '#fff',
                                        }
                                    }}
                                >
                                    <div className="modal">
                                        <img  src={close} alt="Remover pergunta" />

                                        <h1 >Encerrar sala</h1>
                                        <h4>Tem certeza que você deseja encerrar esta sala?</h4>
                                        <div style={
                                            {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                marginTop: '60px',
                                                gap: '10px'
                                            }
                                        }>
                                            <Button iscolorGray onClick={closeModal}>close</Button>
                                            <Button
                                                iscolorRed
                                                type="button"
                                                onClick={() => handleDeleteQuestion(question.id)}
                                            >
                                                Sim,encerrar
                                            </Button>
                                        </div>
                                    </div>
                                </Modal>

                                <button onClick={openModal}>
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