import React from "react";
import styles from "./Toast.module.scss"

const Toast = ({message}) => {
	return (
		<div className={styles.toast}>
			<span>{message}</span>
		</div>
	)
}

export default Toast;