// <Imports>============================================================================================================
import React from "react";
import styles from "./Error.module.scss"
// =====================================================================================================================

const Error = ({item}) => {
	return (
		<div className={styles.item}>
			<span>{item.code}</span>
			<p>{item.description}</p>
		</div>
	)
}

export default Error