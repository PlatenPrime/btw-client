import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";


const initialState = {
	rows: [],
	loading: false,
}



export const createRow = createAsyncThunk(
	'row/createRow',
	async (params) => {
		try {
			const { data } = await axios.post('/rows', params)
			return data
		} catch (error) {
			console.log(error)
		}
	},
)


export const getAllRows = createAsyncThunk('row/getAllRows', async () => {
	try {
		const { data } = await axios.get('/rows')
		return data
	} catch (error) {
		console.log(error)
	}
})


export const removeRow = createAsyncThunk('row/removeRow', async (id) => {
	try {
		const { data } = await axios.delete(`/rows/${id}`, id)
		return data
	} catch (error) {
		console.log(error)
	}
})



export const updateRow = createAsyncThunk(
	'row/updateRow',
	async (updatedRow) => {
		try {
			const { data } = await axios.put(
				`/rows/${updatedRow._id}`,
				updatedRow,
			)
			return data
		} catch (error) {
			console.log(error)
		}
	},
)



export const rowSlice = createSlice({
	name: "row",
	initialState,
	reducers: {

	},
	extraReducers: {

		// Создание ряда
		[createRow.pending]: (state) => {
			state.loading = true
		},
		[createRow.fulfilled]: (state, action) => {
			state.loading = false
			state.rows.push(action.payload)
		},
		[createRow.rejected]: (state) => {
			state.loading = false
		},

		// Получение всех рядов

		[getAllRows.pending]: (state) => {
			state.loading = true
		},
		[getAllRows.fulfilled]: (state, action) => {
			state.loading = false
			state.rows = action.payload.rows
		},
		[getAllRows.rejected]: (state) => {
			state.loading = false
		},

		// Удаление ряда

		[removeRow.pending]: (state) => {
			state.loading = true
		},
		[removeRow.fulfilled]: (state, action) => {
			state.loading = false
			state.rows = state.rows.filter(
				(row) => row._id !== action.payload._id,
			)
		},
		[removeRow.rejected]: (state) => {
			state.loading = false

		},

		// Обновление ряда

		[updateRow.pending]: (state,) => {
			state.loading = true
		},
		[updateRow.fulfilled]: (state, action) => {
			state.loading = false
			state.status = action.payload.message
			console.log(state.rows)
			const index = state.rows.findIndex(
				(row) => row._id === action.payload._id,
			)

			state.rows[index] = action.payload
		},
		[updateRow.rejected]: (state, action) => {
			state.status = action.payload.message
			state.loading = false
		},





	},



})


export default rowSlice.reducer;