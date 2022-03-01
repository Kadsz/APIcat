import { FormEvent, useState } from "react"
import '../styles/counter.scss'

import { FiTrash, FiCheckSquare, FiTerminal } from 'react-icons/fi'


interface Card {
  title: string;
  image: {
    id: number;
    url: string;
  }
}

//Criando uma props para a chamada API
interface ApiProps {
  id: number;
  url: string;
}

export function Counter() {

  const [cards, setCards] = useState<Card[]>([])
  const [nameCat, setNameCat] = useState('')

  function addItems() {

    if (!nameCat) return

    setNameCat('')

    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.json())
      .then((data: ApiProps[]) => {

        const catData = data[0]

        const newCard = {
          title: nameCat,
          image: {
            id: catData.id,
            url: catData.url
          }
        }
        setCards(oldState => [...oldState, newCard])
      })
  }

  function RemoveCat(id: number) {
    const remove = cards.filter(cards => cards.image.id !== id)
    setCards(remove)
  }

  return (
    <>
      <section>
        <h1>Adicionar um gato</h1>
        <div className="InputContainer">
          <input
            placeholder="Escolha o nome do gato..."
            type="text"
            maxLength={16}
            onChange={(e) => setNameCat(e.target.value)}
            value={nameCat}
          />
          <button type="submit" onClick={addItems}>
            <FiCheckSquare />
          </button>
        </div>
      </section>

      <div className="cardContainer">
        {cards.map(card => (
          <div key={card.image.id} className="card">
            <img src={card.image.url} alt="" />
            <h1>Nome do Gato: {card.title}</h1>
            <h2>
              ID: {card.image.id}
            </h2>
            <div className="buttonsContainer">
              <button onClick={() => RemoveCat(card.image.id)}><FiTrash size={25} /></button>
              <button><FiTerminal size={25} /></button>
            </div>
          </div>
        ))}
      </div>
    </>


  )
}