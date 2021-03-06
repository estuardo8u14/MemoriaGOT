import React, { useEffect, useState } from 'react';

import Carta from '../Carta/Carta';
import './Memoria.css';
import carta0 from '../../../public/assets/images/carta_0.png';
import carta1 from '../../../public/assets/images/carta1.png';
import carta2 from '../../../public/assets/images/carta2.png';
import carta3 from '../../../public/assets/images/carta3.png';
import carta4 from '../../../public/assets/images/carta4.png';
import carta5 from '../../../public/assets/images/carta5.png';

const imagenesCartas = [
	{ src: carta0, pareja: false },
	{ src: carta1, pareja: false },
	{ src: carta2, pareja: false },
	{ src: carta3, pareja: false },
	{ src: carta4, pareja: false },
	{ src: carta5, pareja: false },
];

function Memoria() {
	const [cartas, setCartas] = useState([]);
	const [turnos, setTurnos] = useState(0);
	const [eleccionUno, setEleccionUno] = useState(null);
	const [eleccionDos, setEleccionDos] = useState(null);
	const [noTocar, setNoTocar] = useState(false);

	// Revolver cartas
	const revolverCartas = () => {
		const revolvidasCartas = [...imagenesCartas, ...imagenesCartas]
			.sort(() => Math.random() - 0.5)
			.map((carta) => ({ ...carta, id: Math.random() }));

		setEleccionUno(null);
		setEleccionDos(null);
		setCartas(revolvidasCartas);
		setTurnos(0);
	};

	// handle de eleccion
	const handleEleccion = (carta) => {
		eleccionUno ? setEleccionDos(carta) : setEleccionUno(carta);
	};

	useEffect(() => {
		if (eleccionUno && eleccionDos) {
			setNoTocar(true);
			if (eleccionUno.src === eleccionDos.src) {
				setCartas((prevCartas) => prevCartas.map((carta) => {
					if (carta.src === eleccionUno.src) {
						return { ...carta, pareja: true };
					}
					return carta;
				}));
				resetTurno();
			} else {
				setTimeout(() => resetTurno(), 1500);
			}
		}
	}, [eleccionUno, eleccionDos]);

	const resetTurno = () => {
		setEleccionUno(null);
		setEleccionDos(null);
		setTurnos((prevTruno) => prevTruno + 1);
		setNoTocar(false);
	};

	useEffect(() => {
		revolverCartas();
	}, []);

	return (
		<div className="Memoria">
			<h1>Memoria</h1>
			<h2>GAME OF THRONES</h2>
			<button onClick={revolverCartas}>Empezar</button>
			<div className="grid-cartas">
				{cartas.map((carta) => (
					<Carta
						key={carta.id}
						carta={carta}
						handleEleccion={handleEleccion}
						vuelta={carta === eleccionUno || carta === eleccionDos || carta.pareja}
						noTocar={noTocar}
					/>
				))}
			</div>
			<h3>
  Turnos: 
				{' '}
				{turnos}
			</h3>
			<h5>Imagenes dibujadas y juego creado por Estuardo Ureta 17010</h5>
		</div>
	);
}
export default Memoria;
