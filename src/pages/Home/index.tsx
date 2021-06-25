import { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import googleIconImg from '../../assets/images/google-icon.svg';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../services/firebase';
import '../../styles/auth.scss';


export function Home() {
  const history = useHistory();
  const {signInWithGoogle,user} = useContext(AuthContext);
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }
  
  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    console.log('aaaa',roomCode)

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exists');
      return;
    }

    history.push(`/rooms/${roomCode}`); 
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire suas dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImage} alt="Let me ask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="" onSubmit={handleJoinRoom}>
            <input type="text"placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}


