import { getArtDataBtrade } from "./getArtDataBtrade";
import { getArtDataSharte } from "./getArtDataSharte";
import axios from "./axios";




export async function analyzeComp(comp) {
	try {
		// Запускаем оба асинхронных запроса параллельно
		const [sharteData, btradeData] = await Promise.all([
			getArtDataSharte(comp.competitorsLinks.sharteLink),
			getArtDataBtrade(comp.artikul)
		]);

		let priceSharte, isAvailableSharte, priceBtrade, quantBtrade;

		if (sharteData) {
			priceSharte = sharteData.price;
			isAvailableSharte = sharteData.isAvailable;
		}

		if (btradeData) {
			priceBtrade = btradeData.price;
			quantBtrade = btradeData.quant;
		}

		const updateComp = {
			artikul: comp.artikul,
			avail: {
				btrade: quantBtrade,
				sharte: isAvailableSharte
			},
			price: {
				btrade: priceBtrade,
				sharte: priceSharte,
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