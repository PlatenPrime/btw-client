import React from 'react';
import style from "./Spinner.module.css"



const Spinner = () => {
	return (
		<div className={style.spinner} >
			<div className={style.circle1}>
				<div className={style.circle2}>
					<div className={style.circle3}>
						<div className={style.circle4}>
							<div className={style.circle5}>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spinner;