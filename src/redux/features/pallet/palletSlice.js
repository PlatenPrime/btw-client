import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";


const initialState = {
	pallets: [],
	loading: false,
}


export const createPallet = createAsyncThunk(
	'pallet/createPallet',
	async ({ title, positions, rowId }) => {
		try {
			const { data } = await axios.post(`/pallets/${rowId}`, { title, positions, rowId })
			console.log(data)
			return data
		} catch (error) {
			console.log(error)
		}
	},
)


export const getRowPallets = createAsyncThunk(
	'pallet/getRowPallets',
	async (rowId) => {
		try {
			const { data } = await axios.get(`/rows/pallets/${rowId}`)
			return data

		} catch (error) {
			console.log(error)
		}
	},
)





export const getAllPallets = createAsyncThunk('pallet/getAllPallets', async () => {
	try {
		const { data } = await axios.get('/pallets')
		return data
	} catch (error) {
		console.log(error)
	}
})



export const removePallet = createAsyncThunk('pallet/removePallet', async (id) => {
	try {
		const { data } = await axios.delete(`/pallets/${id}`, id)
		return data
	} catch (error) {
		console.log(error)
	}
})




export const updatePallet = createAsyncThunk(
	'pallet/updatePallet',
	async (updatedPallet) => {
		try {
			const { data } = await axios.put(
				`/pallets/${updatedPallet._id}`,
				updatedPallet,
			)
			console.log(data)
			return data
		} catch (error) {
			console.log(error)
		}
	},
)







export const palletSlice = createSlice({
	name: "pallet",
	initialState,
	reducers: {

	},
	extraReducers: {


		// Создание паллеты
		[createPallet.pending]: (state) => {
			state.loading = true
		},
		[createPallet.fulfilled]: (state, action) => {
			state.loading = false
			state.pallets.push(action.payload)
		},
		[createPallet.rejected]: (state) => {
			state.loading = false
		},




		// Получение всех паллет

		[getAllPallets.pending]: (state) => {
			state.loading = true
		},
		[getAllPallets.fulfilled]: (state, action) => {
			state.loading = false
			state.pallets = action.payload.pallets
		},
		[getAllPallets.rejected]: (state) => {
			state.loading = false
		},

		// Получение всех паллет ряда

		[getRowPallets.pending]: (state) => {
			state.loading = true
		},
		[getRowPallets.fulfilled]: (state, action) => {
			state.loading = false
			state.pallets = action.payload
		},
		[getRowPallets.rejected]: (state) => {
			state.loading = false
		},



		// Удаление паллеты

		[removePallet.pending]: (state) => {
			state.loading = true
		},
		[removePallet.fulfilled]: (state, action) => {
			state.loading = false
			state.pallets = state.pallets.filter(
				(pallet) => pallet._id !== action.payload._id,
			)
		},
		[removePallet.rejected]: (state) => {
			state.loading = false

		},


		// Обновление паллеты

		[updatePallet.pending]: (state,) => {
			state.loading = true
		},
		[updatePallet.fulfilled]: (state, action) => {
			state.loading = false
			state.status = action.payload.message
			console.log(state.pallets)
			const index = state.pallets.findIndex(
				(pallet) => pallet._id === action.payload._id,
			)

			state.pallets[index] = action.payload
		},
		[updatePallet.rejected]: (state, action) => {
			state.status = action.payload.message
			state.loading = false
		},


	},



})



export default palletSlice.reducer;