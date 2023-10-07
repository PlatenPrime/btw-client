import React from 'react';
import styles from "./Spinner.module.css"

const Spinner = ({ color }) => {
	return (
		<div className={styles.spinner} style={{ borderTopColor: color }}></div>
	);
}

export default Spinner;