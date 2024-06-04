import { useEffect, useState } from "react";
import { useUser } from "../hooks";
import { ErrorBar } from "../components";

export default function UserPage() {
  const { error, setError, users, getUsers } = useUser();
  const [mail, setMail] = useState("a@teste.com");
  const [password, setPassword] = useState("123456");
  const [profile, setProfile] = useState("user");
  const { create } = useUser();

  useEffect(() => {
    setError(null);
    if (!users) {
      getUsers(); //obtém os usuários cadastrados
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async () => {
    if (!mail) {
      setError({ erro: "Forneça o e-mail" });
    } else if (!password) {
      setError({ erro: "Forneça a senha" });
    } else {
      await create(mail, password, profile);
      getUsers();
    }
  };
console.log("error", error)
  return (
    <>
      {error ? <ErrorBar>{error.erro}</ErrorBar> : <></>}
      <div>
        <h4>Usuários</h4>
        {users && users.length > 0 && (
          <ol>
            {users.map((user) => (
              <li key={user.id}>
                {user.mail} {user.profile}
              </li>
            ))}
          </ol>
        )}
      </div>
      <div>
        <div>
          <label>e-mail</label>
          <input value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Perfil</label>
          <select value={profile} onChange={(e) => setProfile(e.target.value)}>
            <option value="adm">Administrador</option>
            <option value="user">Usuário</option>
          </select>
        </div>
        <div>
          <button onClick={() => handleCreate()}>Criar usuário</button>
        </div>
      </div>
      <div>Excluir usuário Alterar perfil do usuário</div>
    </>
  );
}
