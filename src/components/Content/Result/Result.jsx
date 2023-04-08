// <Imports>============================================================================================================
import React from "react";
import styles from "./Result.module.scss"
// =====================================================================================================================

// Result принимает либо элемент массив(type) либо объект
const Result = ({fieldName, object, type}) => {
	return (
		<>
			{object &&
				<div className={styles.item}>
					<div className="field">{fieldName ? fieldName : ''}</div>
					<div className="type">{object.type ? object.type : ''}</div>
					<div className="description">{object.description ? object.description : ''}</div>
				</div>
			}
			{type &&
				<div className={styles.item}>
					<div className="field"></div>
					<div className="type">{type}</div>
					<div className="description"></div>
				</div>}
		</>
	)
}

export default Result