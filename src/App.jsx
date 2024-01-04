import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGuitar } from '@fortawesome/free-solid-svg-icons'

function App() {
	const portuguese = [
		{ croatian: 'Da', portuguese: 'Sim' },
    { croatian: 'Ne', portuguese: 'Não' },
    { croatian: 'Molim te', portuguese: 'Por favor' },
    { croatian: 'Ispričavam se', portuguese: 'Com licença' },
    { croatian: 'Hvala ti', portuguese: 'Obrigado/Obrigada' },
    { croatian: 'Nema na čemu', portuguese: 'De nada' },
    { croatian: 'Žao mi je', portuguese: 'Desculpa/Desculpe' },
    { croatian: 'Molim te oprosti mi', portuguese: 'Perdão' },
    { croatian: 'Zašto', portuguese: 'Por quê' },
    { croatian: 'Idemo', portuguese: 'Vamos' },
    { croatian: 'Dobro jutro', portuguese: 'Bom dia' },
    { croatian: 'Dobar dan', portuguese: 'Boa tarde' },
    { croatian: 'Dobra večer', portuguese: 'Boa noite' },
    { croatian: 'Pozdrav', portuguese: 'Olá' },
    { croatian: 'Doviđenja', portuguese: 'Adeus' },
    { croatian: 'Vidimo se sutra', portuguese: 'Até amanhã' },
    { croatian: 'Kako si', portuguese: 'Tudo bem' },
    { croatian: 'Ja sam dobro, a ti', portuguese: 'Eu estou bem, e você' },
    { croatian: 'Kako se zoveš', portuguese: 'Qual é o seu nome' },
    { croatian: 'Moje ime je', portuguese: 'Meu nome é' }
	]

	const [input, setInput] = useState('')
	const [current, setCurrent] = useState(0)
	
	const [streak, setStreak] = useState(0)
	const [maxStreak, setMaxStreak] = useState(0)

	const [error, setError] = useState(false)

	const setRandomPortuguese = () => {
		const randomIndex = Math.floor(Math.random() * portuguese.length)
		setCurrent(randomIndex)
	}

	const handleChange = (e) => {
		setInput(e.target.value)
	}

	const handleSubmit = (e) => {
    e.preventDefault();
  
    if (input.toLowerCase() === portuguese[current].croatian.toLowerCase()) {
      setStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        setMaxStreak((prevMaxStreak) => {
          const newMaxStreak = Math.max(newStreak, prevMaxStreak);
          setError(false);
  
          localStorage.setItem('streak', newStreak);
          localStorage.setItem('maxStreak', newMaxStreak);
  
          return newMaxStreak;
        });
  
        return newStreak;
      });
    } else {
      const p = portuguese[current].portuguese;
      const c = portuguese[current].croatian;
      setError(`Krivo! Točan odgovor za "${p}" je "${c}"`);
      setStreak(0);
      localStorage.setItem('streak', 0);
    }
  
    setInput('');
    setRandomPortuguese();
  };

	useEffect(() => {
		setRandomPortuguese()
		setStreak(parseInt(localStorage.getItem('streak')) || 0)
		setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0)
	}, [])

	return (
		<div className="min-h-screen bg-lime-900 text-white text-center">
			<header className="p-6 mb-8">
				<h1 className="text-2xl font-bold uppercase">
          Kviz iz portugalskog
          <FontAwesomeIcon className='ml-4' icon={faGuitar} size='3x' shake/>
        </h1>
				<div>
					<p>{streak} / {maxStreak}</p>
				</div>
			</header>

			<div className="text-4xl font-bold mb-8">
				<p>{portuguese[current].portuguese}</p>
			</div>

			<div className="mb-10">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						onChange={handleChange}
						value={input}
						className="block w-100 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-lg pb-2" />
				</form>
			</div>
			{error && 
				<div>
					<p className='text-red-500 text-center'>{ error }</p>
				</div>
			}
		</div>
	)
}

export default App