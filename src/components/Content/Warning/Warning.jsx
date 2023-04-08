// <Imports>============================================================================================================
import React from "react";
import styles from "./Warning.module.scss"
import {Copy} from "../../../assets/Copy";
// =====================================================================================================================

const Warning = ({data}) => {
	// копирует текст в буфер обмена
	const handleCopyClick = () => {
		navigator.clipboard.writeText(data);
	};
	
	return (
		<div className={`${styles.warning} ${!data && `${styles.hide}`}`}>
			<textarea value={data} onChange={() => {}} className={styles.warningDescription} readOnly={true}/>
			<div onClick={handleCopyClick}>
				<Copy cx={styles.copyIcon}/>
			</div>
		</div>
	)
}

export default Warning;