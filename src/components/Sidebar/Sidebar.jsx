// <Imports>============================================================================================================
import React, {useContext, useState} from "react";

import {AppContext} from "../../context";
import CategoryItem from "../CategoryItem/CategoryItem";

import {Search} from "../../assets/Search"
import styles from "./Sidebar.module.scss"
// =====================================================================================================================

const Sidebar = () => {
	// получаю все категории и его методы
	const {methods} = useContext(AppContext)
	
	const [search, setSearch] = useState('')
	
	return (
		<div className={styles.sidebar}>
			<div action="" className={styles.search}>
				<input value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text" placeholder="Поиск"/>
				<button><Search/></button>
			</div>
			<ul className={styles.titlesList}>
				<li>Методы</li>
			</ul>
			<div className={styles.category}>
				{
					Object.keys(methods).map((item, index) => (
						<CategoryItem key={index} item={item} search={search}/>
					))
				}
			</div>
		</div>
	)
}

export default Sidebar;