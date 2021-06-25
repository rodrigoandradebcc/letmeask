import { FormEvent, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import '../../styles/auth.scss';
import { database } from '../../services/firebase';



export function NewRoom() {
  const {user} = useContext(AuthContext);
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ''){
      return
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form action="" onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}  
            />
            <Button type="submit">
              Criar na sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}


