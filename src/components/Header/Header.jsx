import React from "react";
import {Logo} from "../../assets/Logo"
import {More} from "../../assets/More"
import styles from "./Header.module.scss"

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.container}>
				<div className={styles.сontent}>
					<div className={styles.logo}>
						<Logo/>
						<h4>для разработчиков</h4>
					</div>
					<ul className={styles.list}>
						<li className={styles.active}>Methods</li>
					</ul>
					<div className={styles.more}>
						<More/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header;