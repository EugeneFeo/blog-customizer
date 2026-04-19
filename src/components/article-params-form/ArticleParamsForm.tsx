import { FormEvent, useEffect, useRef, useState  } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';


import { ArticleStateType, defaultArticleState,fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
  onApply: (state: ArticleStateType) => void;
  initialState: ArticleStateType;
};

export const ArticleParamsForm = ( { onApply, initialState }: Props) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	const sidebarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		setFormState(initialState);
	}, [initialState]);

	useEffect(() => {
		if (!isSidebarOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isSidebarOpen]);

	const handleSidebarToggle = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(initialState);
		onApply(initialState);
	};

	const handleFontFamilyChange = (
		option: ArticleStateType['fontFamilyOption']
	) => {
		setFormState((prevState) => ({
			...prevState,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: ArticleStateType['fontSizeOption']) => {
		setFormState((prevState) => ({
			...prevState,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: ArticleStateType['fontColor']) => {
		setFormState((prevState) => ({
			...prevState,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (
		option: ArticleStateType['backgroundColor']
	) => {
		setFormState((prevState) => ({
			...prevState,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: ArticleStateType['contentWidth']) => {
		setFormState((prevState) => ({
			...prevState,
			contentWidth: option,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={handleSidebarToggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text as="h2" size={31} weight={800} uppercase>Задайте параметры</Text>

					<Select title="Шрифт" options={fontFamilyOptions} selected={formState.fontFamilyOption} onChange={handleFontFamilyChange} placeholder='Выберите шрифт'/>

					<RadioGroup title="Размер шрифта" options={fontSizeOptions} selected={formState.fontSizeOption} onChange={handleFontSizeChange} name='font-size'/>

					<Select title="Цвет шрифта" options={fontColors} selected={formState.fontColor} onChange={handleFontColorChange}/>

					<div className={styles.separator}>
  						<Separator />
					</div>

					<Select title="Цвет фона" options={backgroundColors} selected={formState.backgroundColor} onChange={handleBackgroundColorChange}/>

					<Select title="Ширина контента" options={contentWidthArr} selected={formState.contentWidth} onChange={handleContentWidthChange}/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
