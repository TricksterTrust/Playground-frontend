// <Imports>============================================================================================================
import {useState, useEffect} from "react";
import axios from "axios";

import {AppContext} from "./context";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Toast from "./components/Toast/Toast";
// =====================================================================================================================

function App() {
	const [methods, setMethods] = useState([])
	const [activeMethod, setActiveMethod] = useState(null)
	const [activeParentMethod, setActiveParentMethod] = useState('')
	const [contentMethod, setContentMethod] = useState({})

	// для мобильного ограничителя
	const screenUser = window.innerWidth;
	
	// Получаю данные для сайдбара
	useEffect(() => {
		(async function() {
			try {
				await axios.get('https://api.trickstertrust.ru/v1/dev/methods/')
					.then(resp => {
						setMethods(resp.data)
					})
			}
			catch (error) {
				console.log(error.toJSON())
			}
		})()
	}, [])
	// получаю данные для контента если произошёл клик по методу в сайдбаре
	useEffect(() => {
		activeMethod &&
		(async function() {
			try {
				await axios.get(`https://api.trickstertrust.ru/v1/dev/methods/${activeMethod}/`)
					.then(resp => {
						setContentMethod(resp.data)
					})
			}
			catch (error) {
				console.log(error.toJSON())
			}
		})()
	}, [activeMethod])
	
	// возвращает слово с первой заглавной буквой
	const capitalizeFirstLetter = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	
	return (
			<AppContext.Provider value={{methods, contentMethod, activeMethod, setActiveMethod, activeParentMethod, setActiveParentMethod, setContentMethod, capitalizeFirstLetter}}>
				{screenUser < 1024
					?
					<div className="screenLimiter">
						<p>Мобильные устройства не поддерживаются.</p>
						<p>Mobile devices are not supported.</p>
						<img src="../img/limiter.jpg" alt=""/>
					</div>
					:
					<div className="App">
						<Header/>
						<main className="main container">
							<Sidebar/>
							<Content/>
						</main>
					</div>
				}
			</AppContext.Provider>
	);
}

export default App;
