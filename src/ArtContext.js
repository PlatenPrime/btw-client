import React, { createContext, useContext, useState, useEffect } from 'react';
import useFetchArts from './hooks/useFetchArts'


const ArtContext = createContext();

export function useArtContext() {
	return useContext(ArtContext);
}

export function ArtProvider({ children }) {
	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();

	return (
		<ArtContext.Provider value={{ artsDB, loadingArtsDB, errorArtsDB }}>
			{children}
		</ArtContext.Provider>
	);
}
