import { useHistory } from 'react-router-dom'
import illustrationImg from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'
import '../../styles/auth.scss'
import { Button } from '../../components/Button'
import { useAuth } from '../../hoocks/useAuth'


export function Home() {

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
                    <form action="">
                        <input
                            type="text"
                            placeholder="Digite o código da sala" />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}