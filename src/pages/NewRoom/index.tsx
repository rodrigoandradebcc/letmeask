import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import '../../styles/auth.scss';



export function NewRoom() {
  const {user} = useContext(AuthContext);
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
          <form action="">
            <input type="text"placeholder="Nome da sala"/>
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


