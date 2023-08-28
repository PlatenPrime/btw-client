import React, { createContext, useContext, useState, useEffect } from 'react';
import  useFetchArts  from '../../hooks/useFetchArts';
import  useFetchComps  from '../../hooks/useFetchComps';

const CompContext = createContext();

export function CompContextProvider({ children }) {
	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();
	const { compsDB, loadingCompsDB, errorCompsDB } = useFetchComps();

	// Add other state and functions you want to share with child components

	return (
		<CompContext.Provider
			value={{
				artsDB,
				loadingArtsDB,
				errorArtsDB,
				compsDB,
				loadingCompsDB,
				errorCompsDB,
				// Add other state and functions you want to share
			}}
		>
			{children}
		</CompContext.Provider>
	);
}

export function useCompContext() {
	return useContext(CompContext);
}
