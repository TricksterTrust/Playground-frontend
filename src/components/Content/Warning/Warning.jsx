// <Imports>============================================================================================================
import React, {useState} from "react";
import styles from "./Warning.module.scss"
import {Copy} from "../../../assets/Copy";
import Toast from "../../Toast/Toast";
// =====================================================================================================================

const Warning = ({data}) => {
	const [visible, setVisible] = useState(false);
	
	const handleToast = () => {
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 3000); // 3 секунды
	};
	
	// копирует текст в буфер обмена
	const handleCopyClick = () => {
		navigator.clipboard.writeText(data);
		handleToast()
	};
	
	return (
		<div className={`${styles.warning} ${!data && `${styles.hide}`}`}>
			{visible && <Toast message={'Текст скопирован в буфер обмена'}/>}
			<textarea value={data} onChange={() => {}} className={styles.warningDescription} readOnly={true}/>
			<div onClick={handleCopyClick}>
				<Copy cx={styles.copyIcon}/>
			</div>
		</div>
	)
}

export default Warning;