import { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';


import { ArticleStateType, defaultArticleState,fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ( { onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {setIsOpen(!isOpen);};

	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
	}
	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Select title="Шрифт" options={fontFamilyOptions} selected={formState.fontFamilyOption} onChange={(option) => setFormState({...formState, fontFamilyOption: option })} placeholder='Выберите шрифт'/>

					<RadioGroup title="Размер шрифта" options={fontSizeOptions} selected={formState.fontSizeOption} onChange={(option) => setFormState({...formState, fontSizeOption: option })} name='font-size'/>

					<Select title="Цвет шрифта" options={fontColors} selected={formState.fontColor} onChange={(option) => setFormState({...formState, fontColor: option})}/>

					<Separator />

					<Select title="Цвет фона" options={backgroundColors} selected={formState.backgroundColor} onChange={(option) => setFormState({...formState, backgroundColor: option})}/>

					<Select title="Ширина контента" options={contentWidthArr} selected={formState.contentWidth} onChange={(option) => setFormState({...formState, contentWidth: option})}/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
