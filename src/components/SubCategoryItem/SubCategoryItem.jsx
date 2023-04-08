// <Imports>============================================================================================================
import React, {useContext} from "react";
import {AppContext} from "../../context";
import styles from "./SubCategoryItem.module.scss"
// =====================================================================================================================

const SubCategoryItem = ({item, parentItem}) => {
	const {activeMethod, setActiveMethod, setActiveParentMethod} = useContext(AppContext)
	
	// По клику опредяляю по какому методу кликнули и изменяю его в state и так же его родительскую категорию
	const clickItem = () => {
		setActiveParentMethod(parentItem)
		setActiveMethod(item)
	}
	
	return (
		<div onClick={clickItem} className={`${styles.item} ${activeMethod === item && styles.active}`}>
			<p>{item}</p>
		</div>
	)
}

export default SubCategoryItem;