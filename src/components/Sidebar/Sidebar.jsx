// <Imports>============================================================================================================
import React, {useContext} from "react";

import {AppContext} from "../../context";
import CategoryItem from "../CategoryItem/CategoryItem";

import {Search} from "../../assets/Search"
import styles from "./Sidebar.module.scss"
// =====================================================================================================================

const Sidebar = () => {
	// получаю все категории и его методы
	const {methods} = useContext(AppContext)
	
	return (
		<div className={styles.sidebar}>
			<form action="" className={styles.search}>
				<input type="text" placeholder="Поиск"/>
				<button><Search/></button>
			</form>
			<ul className={styles.titlesList}>
				<li>Методы</li>
			</ul>
			<div className={styles.category}>
				{
					Object.keys(methods).map((item, index) => (
						<CategoryItem key={index} item={item}/>
					))
				}
			</div>
		</div>
	)
}

export default Sidebar;