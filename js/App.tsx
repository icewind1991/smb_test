import React, {Component} from 'react';
import {BasicForm} from './BasicForm';
import {InfoResult, SMBProvider} from './SMBProvider';
import {LoadComponent} from "./LoadComponent";
import {Result} from "./Result";

import './App.css';

export interface AppState {
	hostname: string,
	username: string,
	workgroup: string,
	password: string,
	share: string
}

export class App extends Component<{}, AppState> {
	state: AppState = {
		hostname: '',
		username: '',
		workgroup: '',
		password: '',
		share: ''
	};

	smbProvider = new SMBProvider();

	render() {
		return <div id="app-root">
			<h2>Configuration</h2>
			<BasicForm onSubmit={data => this.setState(data)}>
				<table>
					<thead>
					<tr>
						<th>Hostname</th>
						<th>User</th>
						<th>Workgroup</th>
						<th>Password</th>
						<th>Share</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td><input name='hostname' type='text'/></td>
						<td><input name='username' type='text'/></td>
						<td><input name='workgroup' type='text'/></td>
						<td><input name='password' type='password'/></td>
						<td><input name='share' type='text'/></td>
						<td><input type='submit' value='Test'/></td>
					</tr>
					</tbody>
				</table>
			</BasicForm>
			<h2>Result</h2>
			<p className='backend'>
				Using backend:&nbsp;
				<LoadComponent
					load={() => this.smbProvider.info()}
					placeholder='...'
					renderer={info => info.native ? 'php-smbclient' : 'smbclient'}
				/>
			</p>
			{this.state.hostname ? <Result connectionDetails={this.state}
										   smbProvider={this.smbProvider}/> : []}
		</div>
	}
}
