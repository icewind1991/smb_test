import React from 'react';
import {TraceArgsType, TraceLine} from "./SMBProvider";

import './TraceLine.css';

export function TraceLineComponent(props: TraceLine) {
	return (
		<li className={'line'}>
			<p>
				<span className={'file'}>{props.file}</span>
				<span className={'line'}>
					{props.line ? ' - line ' + props.line + ': ' : ''}
				</span>
			</p>
			<p className={'call'}>
				{props.class}{props.type}{props.function}({
				props.args ?
					props.args
						.map((arg, i) => [
							<Argument key={i} data={arg}/>,
							(i < props.args.length - 1) ? ', ' : ''
						]) :
					[]
			})
			</p>
		</li>
	);
}

export interface ArgumentState {
	show: boolean;
}

export interface ArgumentProps {
	data: TraceArgsType;
}

export class Argument extends React.Component<ArgumentProps, ArgumentState> {
	state: ArgumentState = {
		show: false
	};

	toggle = () => {
		this.setState({
			show: !this.state.show,
		});
	};

	render() {
		const baseFormatted = formatArgument(this.props.data);
		const fancyFormatted = formatArgument(this.props.data, 4);
		const showInline = baseFormatted.length < 32;

		return (
			<span className={'argument'}
				  title={showInline ? null : fancyFormatted}>
				{showInline ? baseFormatted : `${baseFormatted.substr(0, 12)} ... ${baseFormatted.substr(baseFormatted.length - 2, 2)}`}
			</span>
		)
	}
}

function formatArgument(data, whitespace = 0, depth = 0) {
	const leadingSpace = ' '.repeat(whitespace * depth);
	if (data && data.__class__) {
		const {'__class__': className, ...copy} = data;
		return `${leadingSpace}${className} ${formatArgument(copy, whitespace, depth).trim()}`;
	} else if (Array.isArray(data)) {
		if (data.length === 0) {
			return `${leadingSpace}[]`;
		}
		return `${leadingSpace}[\n${
			data.map(value =>
				formatArgument(value, whitespace, depth + 1)
			).join(whitespace ? ',\n' : ',')
			}${whitespace ? '\n' : ''}${leadingSpace}]`;
	} else if (data !== null && typeof data === 'object') {
		if (Object.keys(data).length === 0) {
			return `${leadingSpace}{}`;
		}
		const keyWhitespace = ' '.repeat(whitespace * (depth + 1));
		return `${leadingSpace}{\n${
			Object.keys(data).map((key) =>
				`${keyWhitespace}${key}: ${formatArgument(data[key], whitespace, depth + 1).trim()}`
			).join(whitespace ? ',\n' : ',')
			}${whitespace ? '\n' : ''}${leadingSpace}}`;
	} else {
		return leadingSpace + JSON.stringify(data, null, whitespace);
	}
}
