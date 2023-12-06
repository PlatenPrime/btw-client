import Layout from "./components/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ArtProvider } from './ArtContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useAuthStore } from './pages/Auth/authStore'


import LoginPage from "./pages/Auth/LoginPage";
// import { RegisterPage } from "./pages/Auth/RegisterPage";

import { useEffect, useLayoutEffect } from "react";


import MainPage from "./pages/MainPage";
import PalletPage from "./pages/Stocks/PalletPage";
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
import useCheckAuth from "./hooks/useCheckAuth";
import CreateUserPage from "./pages/Auth/CreateUserPage";
import SettingsPage from "./pages/Settings/SettingsPage";




function App() {

	useCheckAuth()





	return (

		<ArtProvider>
			<Layout>

				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="createuser" element={<CreateUserPage />} />



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



					<Route path="settings" element={<SettingsPage />} />





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
