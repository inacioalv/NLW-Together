import { useHistory } from 'react-router-dom'
import illustrationImg from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'
import { Button } from '../../components/Button'
import { useAuth } from '../../hoocks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../../service/firebase'

import './styles.scss'

export function Home() {

    const [roomCode,setRoomCode]= useState('')

    //Navegação
    const history = useHistory();
    
    //Contexto
    const {user,singnInWinthGoogle} = useAuth();

    //Autenticação google
    async function handeleCreateRoom() {
        //Se user não tiver auth
        if(!user){
           await singnInWinthGoogle();
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event:FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        //Buscar a sala pelo id
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        //se não existe retorna error
        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed.');
            return;
        }

        //se existir
        history.push(`/rooms/${roomCode}`);

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo} alt="Letmeask" />
                    <button onClick={handeleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode} />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}