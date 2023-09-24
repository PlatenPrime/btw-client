import { getArtDataBtrade } from "./getArtDataBtrade";
import { getArtDataSharte } from "./getArtDataSharte";
import { getArtDataYumi } from "./getArtDataYumi";
import axios from "./axios";




export async function analyzeComp(comp) {
	try {
		// Запускаем оба асинхронных запроса параллельно
		const [sharteData, btradeData, yumiData] = await Promise.all([
			getArtDataSharte(comp.competitorsLinks.sharteLink),
			getArtDataBtrade(comp.artikul),
			getArtDataYumi(comp.competitorsLinks.yumiLink)
		]);

		let priceSharte, isAvailableSharte, priceBtrade, quantBtrade, priceYumi, quantYumi;

		if (sharteData) {
			priceSharte = sharteData.price;
			isAvailableSharte = sharteData.isAvailable;
		}

		if (btradeData) {
			priceBtrade = btradeData.price;
			quantBtrade = btradeData.quant;
		}

		if (yumiData) {
			priceYumi = yumiData.price;
			quantYumi = yumiData.quant;
		}


		const updateComp = {
			artikul: comp.artikul,
			avail: {
				btrade: quantBtrade,
				sharte: isAvailableSharte,
				yumi: quantYumi
			},
			price: {
				btrade: priceBtrade,
				sharte: priceSharte,
				yumi: priceYumi,
			}
		};

		const updateCompRes = await axios.post("comps/update", updateComp);

		// Проверка на изменения в полях avail и price
		const changes = [];
		// if (quantBtrade !== comp.avail.btrade) {
		// 	changes.push({
		// 		field: 'avail.btrade',
		// 		oldValue: comp.avail.btrade,
		// 		newValue: quantBtrade,
		// 	});
		// }
		if (isAvailableSharte !== null && isAvailableSharte !== undefined !== comp.avail.sharte) {
			changes.push({
				field: 'avail.sharte',
				oldValue: comp.avail.sharte ? "Есть" : "Нет",
				newValue: isAvailableSharte ? "Есть" : "Нет",
			});
		}
		if (quantYumi !== null && quantYumi !== undefined !== comp.avail.yumi) {
			changes.push({
				field: 'avail.yumi',
				oldValue: comp.avail.yumi ? "Есть" : "Нет",
				newValue: quantYumi ? "Есть" : "Нет",
			});
		}




		// if (priceBtrade !== comp.price.btrade) {
		// 	changes.push({
		// 		field: 'price.btrade',
		// 		oldValue: comp.price.btrade,
		// 		newValue: priceBtrade,
		// 	});
		// }




		if (priceSharte !== null && priceSharte !== undefined && priceSharte !== comp.price.sharte) {
			changes.push({
				field: 'price.sharte',
				oldValue: comp.price.sharte,
				newValue: priceSharte,
			});
		}

		if (priceYumi !== null && priceYumi !== undefined && priceYumi !== comp.price.yumi) {
			changes.push({
				field: 'price.yumi',
				oldValue: comp.price.yumi,
				newValue: priceYumi,
			});
		}







		if (changes.length > 0) {
			// Создание записи в журнале при наличии изменений

			try {

				const artikul = comp.artikul

				for (const change of changes) {
					const createLogComp = await axios.post("logs", {
						artikul, change
					});
					console.log(createLogComp)
				}

			} catch (error) {
				console.log(error)

			}
		}

		console.log(updateCompRes)

	} catch (error) {
		console.log(error)
	}


}