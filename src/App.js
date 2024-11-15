import React, { useState, useEffect } from "react";

function App() {
  const [cep, setCep] = useState("");
  const [cepList, setCepList] = useState([]);
  const [selectedCep, setSelectedCep] = useState(null); 
  const API_URL = "http://localhost:8000/api"; 

  const fetchCepList = () => {
    fetch(`${API_URL}/show/`)
      .then((response) => response.json())
      .then((data) => setCepList(data))
      .catch((error) => console.error("Erro ao carregar a lista de CEPs:", error));
  };

  useEffect(() => {
    fetchCepList();
  }, []);

  const submitCep = () => {
    if (!cep) {
      alert("Digite um CEP válido!");
      return;
    }
    fetch(`${API_URL}/cep/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cep }),
    })
      .then((response) => {
        if (response.ok) {
          setCep("");
          fetchCepList();
        } else {
          alert("Erro ao cadastrar o CEP!");
        }
      })
      .catch((error) => console.error("Erro ao enviar o CEP:", error));
  };

  const handleCepClick = (cepItem) => {
    setSelectedCep(cepItem);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Cadastro de CEPs</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Digite um CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
          maxLength={8}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={submitCep}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cadastrar CEP
        </button>
      </div>

      <h2>Lista de CEPs</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cepList.map((item) => (
          <li
            key={item.id}
            onClick={() => handleCepClick(item)}
            style={{
              padding: "10px",
              marginBottom: "5px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {item.cep}
          </li>
        ))}
      </ul>

      {selectedCep && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#f1f1f1",
          }}
        >
          <h3>Detalhes do CEP</h3>
          <p><strong>CEP:</strong> {selectedCep.cep}</p>
          <p><strong>Rua:</strong> {selectedCep.rua}</p>
          <p><strong>Bairro:</strong> {selectedCep.bairro}</p>
          <p><strong>Cidade:</strong> {selectedCep.cidade}</p>
          <p><strong>UF:</strong> {selectedCep.uf}</p>
          <p><strong>DDD:</strong> {selectedCep.ddd}</p>
        </div>
      )}
    </div>
  );
}

export default App;
