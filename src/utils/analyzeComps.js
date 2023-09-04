import { getArtDataBtrade } from "./getArtDataBtrade";
import { getArtDataSharte } from "./getArtDataSharte";
import axios from "./axios";




export async function analyzeComps(comps) {

	comps.forEach(async comp => {


		try {
			const { price: priceSharte, isAvailable: isAvailableSharte } = await getArtDataSharte(comp.competitorsLinks.sharteLink);

			const { price: priceBtrade, quant: quantBtrade } = await getArtDataBtrade(comp.artikul)

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

			}

			const updateCompRes = await axios.post("comps/update", updateComp);

			console.log(updateCompRes)

		} catch (error) {
			console.log(error)
		}




	});

}