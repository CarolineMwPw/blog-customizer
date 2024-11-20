import React, { FormEvent, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	articleFormState: ArticleStateType;
	setArticleFormState: (p: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(props.articleFormState); // Начальное состояние из defaultArticleState

	const articleFormRef = useRef<HTMLDivElement>(null);

	// Функции для открытия и закрытия сайдбара
	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const handleApply = (e: FormEvent) => {
		e.preventDefault();
		// Логика применения стилей через CSS переменные (реализовано в App)
		props.setArticleFormState(formState); // здесь применяем новое состояние
		toggleSidebar();
	};

	const handleReset = (e: FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState); // Сброс до начального значения
		props.setArticleFormState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		onChange: setIsOpen,
		rootRef: articleFormRef,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={articleFormRef}
				className={clsx(
					styles.container,
					isOpen ? styles.container_open : null
				)}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: option }))
						}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, fontColor: option }))
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, backgroundColor: option }))
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState((prev) => ({ ...prev, contentWidth: option }))
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
