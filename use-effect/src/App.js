import { useEffect, useState } from "react";

function App() {

  const [racas, setRacas] = useState([])
  const [busca, setBusca] = useState("")
  useEffect(() => {
    fetch("http://localhost:8080/doguinhos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setRacas(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  useEffect(() => {
    let endpoint = "http://localhost:8080/doguinhos"
    if (busca && busca.length > 3) {
      endpoint = "http://localhost:8080/doguinhos?nome=" + busca
    }
    fetch(endpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setRacas(data))
        .catch((error) => console.error("Erro ao buscar dados:", error));
  }, [busca])
  return (
    <div className="App">
      <h1>Todos os cachorrinhos</h1>
      <h4>Confira uma lista de raças de cachorrinhos!</h4>
      <input onChange={e => setBusca(e.target.value)} />
      <ul>
        {racas.map(raca => <li key={raca.nome}> {raca.nome}</li>)}
      </ul>
    </div>
  );
}

export default App;
