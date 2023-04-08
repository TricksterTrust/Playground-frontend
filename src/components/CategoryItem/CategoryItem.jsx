// <Imports>============================================================================================================
import React, {useContext, useState} from "react";
import classNames from 'classnames/bind';

import {AppContext} from "../../context";
import SubCategoryItem from "../SubCategoryItem/SubCategoryItem";

import styles from "./CategoryItem.module.scss"
// =====================================================================================================================

let cx = classNames.bind(styles);

const CategoryItem = ({item}) => {
	const {methods, capitalizeFirstLetter} = useContext(AppContext)
	const [opened, setOpened] = useState(false)
	
	// определяю родительскую категорию, чтобы потом её занести в state
	const parentItem = item;
	
	const dropDown = () => {
		setOpened((!opened))
	}
	
	return (
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
						<SubCategoryItem key={index} item={item} parentItem={parentItem}/>
					))}
				</div>
			}
		</div>
	)
}

export default CategoryItem;