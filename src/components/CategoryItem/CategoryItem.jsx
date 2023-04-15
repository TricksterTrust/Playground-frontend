// <Imports>============================================================================================================
import React, {useContext, useEffect, useState} from "react";
import classNames from 'classnames/bind';

import {AppContext} from "../../context";
import SubCategoryItem from "../SubCategoryItem/SubCategoryItem";

import styles from "./CategoryItem.module.scss"
// =====================================================================================================================

let cx = classNames.bind(styles);

const CategoryItem = ({item, search}) => {
	const {methods, capitalizeFirstLetter} = useContext(AppContext)
	const [opened, setOpened] = useState(false)
	
	// определяю родительскую категорию, чтобы потом её занести в state
	const parentItem = item;
	
	const dropDown = () => {
		setOpened((!opened))
	}
	
	// Возвращает true если найдена подкатегория в категории включающая в своё имя search.
	// Если search = '', то 0, чтобы не открывать все категории при загрузке страницы
	const filteredParentItem = () => {
		return methods[item].some(item => search !== '' ? item.toLowerCase().includes(search) : 0)
	}
	
	useEffect(() => {
		setOpened(filteredParentItem())
	}, [search])

	return (
		(search === '' ? true : filteredParentItem())  &&
		<div className={styles.categoryItem}>
			<h3
				className={cx({
					opened: opened === true
				})}
				onClick={dropDown}>{capitalizeFirstLetter(item)}
			</h3>
			{opened &&
				<div className={styles.categoryItemBody}>
					{methods[item].map((item, index) => (
						item.includes(search) && <SubCategoryItem key={index} item={item} parentItem={parentItem}/>
					))}
				</div>
			}
		</div>
	)
}

export default CategoryItem;