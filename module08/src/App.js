import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');
  // 1- nome da estado / 2- funcao para atualizar o estado
  // como o estado deve iniciar

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    // posso passar um estado dentro de outro estado
    setNewTech('');
  }, [newTech, tech]);
  // useCallback evita uma funcao ficar sendo recriada
  // utiliza so quando a funcao altera o estado

  useEffect(() => {
    const Storagetech = localStorage.getItem('tech');

    if (Storagetech) {
      setTech(JSON.parse(Storagetech));
    }
  }, []);
  // 1- Funcao para ser executada
  // 2- condicao # se for array vazio = componentDidMount # passando variavel = componentDidUpdate

  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  const techSize = useMemo(() => tech.length, [tech]);
  // 1- funcao para ser executada 2- dependencias
  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>You have {techSize} techs in your list</strong>
      <br />
      <input
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </>
  );
}

export default App;
