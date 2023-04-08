// <Imports>============================================================================================================
import React, {useContext} from "react";
import {AppContext} from "../../context";
import styles from "./Content.module.scss"

import Method from "./Method/Method";
import Result from "./Result/Result";
import Warning from "./Warning/Warning";
import Error from "./Error/Error";

import {ArrowRight} from "../../assets/ArrowRight"
import {Lock} from "../../assets/Lock";
import {Unlock} from "../../assets/Unlock";
// =====================================================================================================================

// params (required либо optional). Result undefined, чтобы не выполнять parseJSONToJS по пустому объекту
const contentState = {
	description: {},
	params: [],
	result: undefined,
	error: [],
}

const Content = () => {
	const {contentMethod, activeMethod, activeParentMethod, capitalizeFirstLetter} = useContext(AppContext)
	
	// обнуление, для того чтобы занести новые данные
	contentState.params = [];
	contentState.error = [];
	
	// распределяем данные из contentMethod в contentState
	contentMethod["params_type"] && contentMethod["params_type"].forEach(item => {
		switch (item.type) {
			case "description":
				contentState.description = {...item};
				break;
			case "required":
				contentState.params.push(item);
				break;
			case "optional":
				contentState.params.push(item);
				break;
			case "result":
				contentState.result = {...item};
				break;
			case "error":
				contentState.error.push(item);
				break;
			default:
				break;
		}
	})

	// для класса к типу запроса
	const colorPathsRequest = (type) => {
		return String(type).toLowerCase()
	}
	
	// переводит пришедший json объект в js путём смены '' на ""
	function parseJSONToJS(str) {
		return JSON.parse(str.replace(/'/g, '"'))
	}
	
	// просто определяем переменную
	let resultObjects = null
	
	// если есть данные в result, то распарси
	if (contentState.result) {
		resultObjects = parseJSONToJS(contentState.result.objects)
	}
	
	return (
		<div className={styles.content}>
			{
				Object.entries(contentMethod).length === 0
				?
					<h2 className={styles.splashScreen}>Выберите какой-либо метод</h2>
				:
					<>
						<div className={styles.breadCrumbs}>
							<h4>{activeParentMethod ? capitalizeFirstLetter(activeParentMethod) : ""}</h4>
							<ArrowRight/>
							<p>{activeMethod}</p>
						</div>
						{contentMethod.paths &&
							<div className={styles.infoRequest}>
								<p className={styles.apiPath}>{`https://api.trickstertrust.ru/${contentMethod.paths[0].path}`}</p>
								<div className={styles.items}>
									{contentMethod.paths.map((item, index) => (
										<div key={index} className={styles.itemInfo}>
											<div className={`${styles.btnTypeRequest} ${styles[colorPathsRequest(item.type)]}`}>{item.type}</div>
											{item.authenticated
												?
												<div className={styles.authorize}><Lock/> Authorize</div>
												:
												<div className={styles.authorize}><Unlock/></div>
											}
										</div>
									))}
								</div>
							</div>
						}
						<div>
							<p className={styles.descriptionRequest}>{contentState.description["text"]}</p>

							{contentState.description["warning_text"] &&
								<Warning data={contentState.description["warning_text"]}/>
							}
						</div>
						{contentState.params.length > 0 &&
							<div className={styles.params}>
								<h3>Параметры</h3>
								{contentState.params.map((item, index) => (
									<Method key={index} item={item}/>
								))}
							</div>
						}
						{resultObjects &&
							<div className={styles.result}>
								<h3>Результат</h3>
								<p className={styles.resultDescription}>{contentState.result.description}</p>
								<div className={styles.resultTable}>
									<div className={styles.resultTableTop}>
										<div>Поле</div>
										<div>Тип</div>
										<div>Описание</div>
									</div>
									<div className={styles.resultTableBody}>
										{Array.isArray(resultObjects)
											?
											resultObjects.map((item, index) => (
												<Result key={index} type={item}/>
											))
											:
											Object.keys(resultObjects).map((item, index) => (
												<Result key={index} fieldName={item} object={resultObjects[item]}/>
											))
										}
									</div>
								</div>
							</div>
						}
						{contentState.error.length > 0 &&
							<div className={styles.errors}>
								<h3>Коды ошибок</h3>
								<div className={styles.items}>
									{
										contentState.error.map((item, index) => (
											<Error key={index} item={item}/>
										))
									}
								</div>
							</div>
						}
						<div className={styles.example}>
							<h3>Пример запроса</h3>
							<div className={styles.exampleTable}></div>
						</div>
					</>
			}
		</div>
	)
}

export default Content;