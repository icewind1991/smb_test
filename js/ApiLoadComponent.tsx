import * as React from "react";
import {LoadComponent} from "./LoadComponent";
import {ApiResult, Exception, TraceLine} from "./SMBProvider";

import './ApiLoadComponent.css';
import {TraceLineComponent} from "./TraceLine";

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
			<Error exception={result.exception} errorMessage={errorMessage}
				   expanded={true}/>}
	/>
}

export interface ErrorProps {
	exception: Exception;
	errorMessage: string;
	expanded: boolean;
}

export interface ErrorState {
	toggled: boolean;
}

export class Error extends React.Component<ErrorProps, ErrorState> {
	state: ErrorState = {
		toggled: false
	};

	toggle() {
		this.setState({toggled: !this.state.toggled});
	}

	render() {
		return <div className="error" onClick={this.toggle.bind(this)}>
			<p className="message">{this.props.errorMessage}</p>
			<p className="exception">{this.props.exception.Exception}: {this.props.exception.Message}</p>
			<p>
				{
					(this.props.expanded !== this.state.toggled) ?
						<ol className='trace' start={0}>
							{this.props.exception.Trace.map((trace, i) => {
								return (
									<TraceLineComponent key={i} {...trace}/>
								);
							})}
						</ol> : []
				}
			</p>
		</div>;
	}
}
