import React from 'react'
import styles from './styles.module.css'

export default function InsContainer({
	children
}) {
	return (
		<div className={styles.insBodyContainer}>{children}</div>
	)
}
