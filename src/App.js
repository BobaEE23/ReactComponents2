import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	/* При клике на кнопку установка выбранного шага в качестве активного */

	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	let isFirstStep = true;
	let isLastStep = false;
	if (activeIndex !== 0) {
		isFirstStep = false;
	}
	if (activeIndex === steps.length - 1) {
		isLastStep = true;
	}

	const onClickBack = () => setActiveIndex(activeIndex - 1);

	const onClickForward = () => setActiveIndex(activeIndex + 1);

	const onClickStartOver = () => setActiveIndex(0);
	const clickBtnStep = (btnId) => setActiveIndex(btnId - 1);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{data[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }) => (
							<li
								className={
									activeIndex + 1 >= Number(id) &&
									activeIndex + 1 === Number(id)
										? styles['steps-item'] +
											' ' +
											styles.done +
											' ' +
											styles.active
										: activeIndex + 1 >= Number(id)
											? styles['steps-item'] + ' ' + styles.done
											: styles['steps-item']
								}
								key={id}
							>
								<button
									onClick={() => clickBtnStep(Number(id))}
									className={styles['steps-item-button']}
								>
									{Number(id)}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onClickBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						{!isLastStep ? (
							<button className={styles.button} onClick={onClickForward}>
								Далее
							</button>
						) : (
							<button className={styles.button} onClick={onClickStartOver}>
								Начать с начала
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
