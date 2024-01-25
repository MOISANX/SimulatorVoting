import React, { useState, useEffect } from "react"

import api from "./service/api"

interface Participante {
  id: string
  nome: string
}

const VotacaoApp: React.FC = () => {
  const [participantes, setParticipantes] = useState<Participante[]>([])
  const [selectedParticipante, setSelectedParticipante] = useState<
    string | null
  >(null)

  useEffect(() => {
    const fetchParticipantes = async () => {
      try {
        const response = await api.get("/api/participantes/todos")
        setParticipantes(response.data)
      } catch (error) {
        console.error("Error fetching participants", error)
      }
    }

    fetchParticipantes()
  }, [])

  const handleVote = async () => {
    if (selectedParticipante) {
      try {
        // Send a vote to the backend
        await api.post("/api/votacao", { id: selectedParticipante })
        alert("Voto registrado com sucesso!")
      } catch (error) {
        console.error("Error voting", error)
        alert("Erro ao registrar voto")
      }
    } else {
      alert("Selecione um participante antes de votar")
    }
  }

  return (
    <div>
      <h1>Participantes</h1>
      <ul>
        {participantes.map((participante) => (
          <li key={participante.id}>
            {participante.nome}{" "}
            <button onClick={() => setSelectedParticipante(participante.id)}>
              Selecionar
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleVote}>Votar</button>
    </div>
  )
}

export default VotacaoApp
