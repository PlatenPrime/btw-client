import Layout from "./components/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ArtProvider } from './ArtContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import MainPage from "./pages/MainPage";



import PalletPage from "./pages/Stocks/PalletPage";





import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, getMe } from "./redux/features/auth/authSlice";
import { useEffect, useLayoutEffect } from "react";
import ArtPage from "./pages/Stocks/ArtPage";
import ArtsPage from "./pages/Stocks/ArtsPage";

import CompsPage from "./pages/Competitors/pages/CompsPage";
import CompsEditPage from "./pages/Competitors/pages/CompsEditPage";
import CompsListPage from "./pages/Competitors/pages/CompsListPage";
import CompsLogsPage from "./pages/Competitors/pages/CompsLogsPage";
import CompsAddPage from "./pages/Competitors/pages/CompsAddPage";
import StocksPage from "./pages/Stocks/StocksPage";
import RowPage from "./pages/Stocks/RowPage";
import AsksPage from "./pages/Stocks/AsksPage";
import AskPage from "./pages/Stocks/AskPage";
import ArtsUpdatingPage from "./pages/Stocks/ArtsUpdatingPage";





function App() {


	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMe())

	}, [dispatch])









	return (

		<ArtProvider>
			<Layout>

				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />


					<Route path="pallets/:id" element={<PalletPage />} />



					<Route path="stocks" element={<StocksPage />} />
					<Route path="rows/:id" element={<RowPage />} />



					<Route path="arts" element={<ArtsPage />} />
					<Route path="arts/updating" element={<ArtsUpdatingPage />} />
					<Route path="arts/:id" element={<ArtPage />} />


					<Route path="asks" element={<AsksPage />} />
					<Route path="asks/:id" element={<AskPage />} />



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
		</ArtProvider>




	);
}

export default App;
