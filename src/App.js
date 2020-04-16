import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[repositories])

  async function handleAddRepository() {
    await api.post('/repositories', {
      "title": `Desafio bootCamp ${Date.now()}`,
      "url": "https://iaron.com",
      "techs": ["Vue", "Angular"]
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);   
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
