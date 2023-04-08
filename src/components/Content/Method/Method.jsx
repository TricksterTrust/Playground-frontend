// <Imports>============================================================================================================
import React from "react";
import styles from "./Method.module.scss"
import Warning from "../Warning/Warning";
// =====================================================================================================================

const paramsType = ["body", "query", "param"]

const Method = ({item}) => {
	const paramTypeActiveClass = (type) => {
		if (type === item["param_type"]) {
			return styles.active
		}
	}
	
	return (
		<div className={styles.methodContent}>
			<div className={styles.methodInfo}>
				<h4>{item.name}</h4>
				<span className={styles.nameType}>{item["name_type"]}</span>
				<span className={styles.type}>{item["type"]}</span>
			</div>
			<div className={styles.methodBody}>
				<p className={styles.description}>{item["description"]}</p>
				
				<Warning data={item["warning_description"]}/>
				
				<h4 className={styles.titleParamType}>Тип параметра</h4>
				<div className={styles.paramTypeItems}>
					{
						paramsType.map((type, index) => (
							<div key={index} className={`${styles.paramTypeItem} ${paramTypeActiveClass(type)}`}>{type}</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Method;