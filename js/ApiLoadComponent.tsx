import * as React from "react";
import {LoadComponent} from "./LoadComponent";
import {ApiResult, Exception} from "./SMBProvider";

import './ApiLoadComponent.css';

export interface LoadComponentProps<T> {
	errorMessage: string;
	load: () => Promise<ApiResult<T>>;
	renderer: (result: T) => React.ReactNode;
	placeholder?: React.ReactNode;
}

export function ApiLoadComponent<T>({load, renderer, placeholder, errorMessage}: LoadComponentProps<T>) {
	return <LoadComponent
		load={load}
		placeholder={placeholder}
		renderer={(result: ApiResult<T>) => result.success ? renderer(result.data) :
			<Error exception={result.exception} errorMessage={errorMessage}/>}
	/>
}

export interface ErrorProps {
	exception: Exception;
	errorMessage: string;
}

export function Error({exception, errorMessage}: ErrorProps) {
	return <div className="error">
		<p className="message">{errorMessage}</p>
		<p className="exception">{exception.Exception}: {exception.Message}</p>
	</div>;
}
