import * as React from 'react';

export interface LoadComponentProps<T> {
	load: () => Promise<T>;
	renderer: (result: T) => React.ReactNode;
	placeholder?: React.ReactNode;
}

export interface LoadComponentState<T> {
	result?: T;
}

export class LoadComponent<T> extends React.Component<LoadComponentProps<T>, LoadComponentState<T>> {
	state: LoadComponentState<T> = {};

	componentDidMount() {
		if (!this.state.result) {
			this.load();
		}
	}

	componentWillReceiveProps() {
		this.state.result = undefined;
		setTimeout(() => {
			this.load();
		}, 10);
	}

	load = () => {
		this.props.load().then(result => this.setState({result}));
	};

	render() {
		if (this.state.result) {
			return this.props.renderer(this.state.result);
		} else {
			return this.props.placeholder || [];
		}
	}
}
