import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {
    const repository = await api.post('/repositories', {
      "title": `Desafio bootCamp ${Date.now()}`,
      "url": "https://iaron.com",
      "techs": ["Vue", "Angular"]
    });

    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch (error) {
      alert('Erro ao deletar.')
    }
       
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
           <li key={repository.id}>
           {repository.title}
         <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
         </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
