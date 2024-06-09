import React from 'react'
import styles from './styles.module.css'
import { ContainerBlock } from '../../../components'

export default function InsBodyContainer({
	children
}) {
	return (
		<ContainerBlock
			className="bg-blue-500/10
		rounded-xl"
		>
			<div className={styles.insBodyContainer}>{children}</div>
		</ContainerBlock>
	)
}
