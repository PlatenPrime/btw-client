import { getArtDataBtrade } from "./getArtDataBtrade";
import { getArtDataSharte } from "./getArtDataSharte";
import { getArtDataYumi } from "./getArtDataYumi";
import { getArtDataBest } from "./getArtDataBest";
import axios from "./axios";
import { getArtDataAir } from "./getArtDataAir";




export async function analyzeComp(comp) {
	try {

		// const [sharteData, btradeData, yumiData, airData, bestData] = await Promise.allSettled([
		// 	comp.competitorsLinks && comp.competitorsLinks.sharteLink ? getArtDataSharte(comp.competitorsLinks.sharteLink) : Promise.resolve(null),
		// 	getArtDataBtrade(comp.artikul),
		// 	comp.competitorsLinks && comp.competitorsLinks.yumiLink ? getArtDataYumi(comp.competitorsLinks.yumiLink) : Promise.resolve(null),
		// 	comp.competitorsLinks && comp.competitorsLinks.airLink ? getArtDataAir(comp.competitorsLinks.airLink) : Promise.resolve(null),
		// 	comp.competitorsLinks && comp.competitorsLinks.bestLink ? getArtDataBest(comp.competitorsLinks.bestLink) : Promise.resolve(null),
		// ]);

		let sharteData, btradeData, yumiData, airData, bestData

		console.log("Before getArtDataSharte");
		if (comp.competitorsLinks.sharteLink) sharteData = await getArtDataSharte(comp.competitorsLinks.sharteLink);
		console.log("After getArtDataSharte");

		console.log("Before getArtDataBtrade");
		if (comp.artikul) btradeData = await getArtDataBtrade(comp.artikul);
		console.log("After getArtDataBtrade");

		console.log("Before getArtDataYumi");
		if (comp.competitorsLinks.yumiLink) yumiData = await getArtDataYumi(comp.competitorsLinks.yumiLink);
		console.log("After getArtDataYumi");


		console.log("Before getArtDataAir");
		if (comp.competitorsLinks.airLink) airData = await getArtDataAir(comp.competitorsLinks.airLink);
		console.log("After getArtDataAir");



		console.log("Before getArtDataBest");
		if (comp.competitorsLinks.bestLink) bestData = await getArtDataBest(comp.competitorsLinks.bestLink);
		console.log("After getArtDataBest");





		let priceSharte, isAvailableSharte, priceBtrade, quantBtrade, priceYumi, quantYumi, priceAir, isAvailableAir, priceBest, isAvailableBest;

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


		if (airData) {
			priceAir = airData.price;
			isAvailableAir = airData.isAvailable;
		}

		if (bestData) {
			priceBest = bestData.price;
			isAvailableBest = bestData.isAvailable;
		}








		const updateComp = {
			artikul: comp.artikul,
			avail: {
				btrade: quantBtrade,
				sharte: isAvailableSharte,
				yumi: quantYumi,
				air: isAvailableAir,
				best: isAvailableBest,
			},
			price: {
				btrade: priceBtrade,
				sharte: priceSharte,
				yumi: priceYumi,
				air: priceAir,
				best: priceBest,
			}
		};

		console.log("Update Comp: ", updateComp)

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
		if (isAvailableSharte !== null && isAvailableSharte !== undefined && isAvailableSharte !== comp.avail.sharte) {
			changes.push({
				field: 'avail.sharte',
				oldValue: comp.avail.sharte ? "Есть" : "Нет",
				newValue: isAvailableSharte ? "Есть" : "Нет",
			});
		}


		if (quantYumi !== null && quantYumi !== undefined && quantYumi !== comp.avail.yumi) {
			changes.push({
				field: 'avail.yumi',
				oldValue: comp.avail.yumi ? "Есть" : "Нет",
				newValue: quantYumi ? "Есть" : "Нет",
			});
		}


		if (isAvailableAir !== null && isAvailableAir !== undefined && isAvailableAir !== comp.avail.air) {
			changes.push({
				field: 'avail.air',
				oldValue: comp.avail.air ? "Есть" : "Нет",
				newValue: isAvailableAir ? "Есть" : "Нет",
			});
		}


		if (isAvailableBest !== null && isAvailableBest !== undefined && isAvailableBest !== comp.avail.best) {
			changes.push({
				field: 'avail.best',
				oldValue: comp.avail.best ? "Есть" : "Нет",
				newValue: isAvailableBest ? "Есть" : "Нет",
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

		if (priceAir !== null && priceAir !== undefined && priceAir !== comp.price.air) {
			changes.push({
				field: 'price.air',
				oldValue: comp.price.air,
				newValue: priceAir,
			});
		}

		if (priceBest !== null && priceBest !== undefined && priceBest !== comp.price.best) {
			changes.push({
				field: 'price.best',
				oldValue: comp.price.best,
				newValue: priceBest,
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