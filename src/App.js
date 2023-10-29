import Layout from "./components/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import MainPage from "./pages/MainPage";



import PalletPage from "./pages/Stocks/PalletPage";




import RowsPage from "./pages/Row/RowsPage";





import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, getMe } from "./redux/features/auth/authSlice";
import { useEffect, useLayoutEffect } from "react";
import ArtFindPage from "./pages/Art/ArtFindPage";
import ArtPage from "./pages/Art/ArtPage";
import ArtsPage from "./pages/Stocks/ArtsPage";
import ArtsZonesLoadingPage from "./pages/Art/ArtsZonesLoadingPage";
import CompsPage from "./pages/Competitors/pages/CompsPage";
import CompsEditPage from "./pages/Competitors/pages/CompsEditPage";
import CompsListPage from "./pages/Competitors/pages/CompsListPage";
import CompsLogsPage from "./pages/Competitors/pages/CompsLogsPage";
import CompsAddPage from "./pages/Competitors/pages/CompsAddPage";
import StocksPage from "./pages/Stocks/StocksPage";
import RowPage from "./pages/Stocks/RowPage";





function App() {


	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMe())

	}, [dispatch])









	return (


		<Layout>

			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />


				<Route path="pallets/:id" element={<PalletPage />} />



				<Route path="stocks" element={<StocksPage />} />
				<Route path="rows" element={<RowsPage />} />
				<Route path="rows/:id" element={<RowPage />} />



				<Route path="arts" element={<ArtsPage />} />
				<Route path="arts/:id" element={<ArtPage />} />



				<Route path="zones" element={<ArtsZonesLoadingPage />} />


				<Route path="comps" element={<CompsPage />} >
					<Route path="edit" element={<CompsEditPage />} />
					<Route path="list" element={<CompsListPage />} />
					<Route path="logs" element={<CompsLogsPage />} />
					<Route path="add" element={<CompsAddPage />} />
				</Route>





			</Routes>

			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>

		</Layout>





	);
}

export default App;
