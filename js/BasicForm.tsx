import React from 'react';

export type OnSubmitCallBack = (data: {}) => void;

function saveInput(onSubmit: OnSubmitCallBack, e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	const form = e.currentTarget;

	const data = [].reduce.call(form.elements, (data, element) => {
		if (element.name) {
			data[element.name] = element.value;
		}
		return data;
	}, {});

	onSubmit(data);
}

export interface BasicFormProps {
	children: React.ReactNode;
	onSubmit: OnSubmitCallBack;
}

export const BasicForm = ({children, onSubmit}: BasicFormProps) => <form
	onSubmit={saveInput.bind(null, onSubmit)}>
	{children}
</form>;
