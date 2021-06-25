import { FormEvent,useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import '../../styles/auth.scss'
import { Button } from '../../components/Button'
import { database } from '../../service/firebase'
import { useAuth } from '../../hoocks/useAuth'


export function NewRoom() {
    
    const [newRoom,setNewRoom]=useState('');

    const {user} = useAuth();
    const history = useHistory()

    //Creiar sala
    async function handleCreateRom(event:FormEvent){
        event.preventDefault();

        //se valor for vazio retorna
        if(newRoom.trim() === ''){
            return;
        }
        
        //no db vai ter uma separação rooms para incluir dados
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title:newRoom,
            authorId:user?.id, //authorId o id do usuário logado
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom} />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala já existente?
                        <Link to="/">
                            Clique aqui
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

// Com authorId da para filtrar as permições