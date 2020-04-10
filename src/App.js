import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepostories] = useState([]);

  useEffect(() => {
    api.get('/repositories', []).then(response => {
      setRepostories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    const repository = {
        title: `Desafio Node.js ${Date.now()}`,
        url:  "http://github.com/...",
        techs: [
            "Node.js",
            "React",
            "Lua"
        ]
    }
    const response = await api.post('/repositories', repository)

    setRepostories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    // const newRepository = repositories;

    // const repoIndex = repositories.findIndex(repository => (repository.id === id));

    // console.log(repoIndex);

    // if (repoIndex >- 1) {
    //   newRepository.splice(repoIndex, 1);
    //   setRepostories(newRepository);
    //   console.log(newRepository);
    // }
    try{
      await api.delete(`repositories/${id}`);

      setRepostories(repositories.filter(repository => repository.id !== id));
    } catch(err) {
      alert('Erro ao deletar caso. Tente novamente')
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
          )) }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
