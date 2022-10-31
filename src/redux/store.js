import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import palletSlice from "./features/pallet/palletSlice";
import rowSlice from "./features/row/rowSlice";


export const store = configureStore({
	reducer: {
		auth: authSlice,
		pallet: palletSlice,
		row: rowSlice,
	}
})