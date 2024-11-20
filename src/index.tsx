import { createRoot } from 'react-dom/client';
import { useState, StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleFormState, setArticleFormState] = useState(defaultArticleState);

	// Выставляем CSS переменные
	const stylesVariables = {
		'--font-family': articleFormState.fontFamilyOption.value,
		'--font-size': articleFormState.fontSizeOption.value,
		'--font-color': articleFormState.fontColor.value,
		'--container-width': articleFormState.contentWidth.value,
		'--bg-color': articleFormState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={stylesVariables}>
			<ArticleParamsForm
				articleFormState={articleFormState}
				setArticleFormState={setArticleFormState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
