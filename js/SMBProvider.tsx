export interface ApiSuccessResult<T> {
	success: true;
	data: T;
}

export interface ApiFailureResult {
	success: false;
	exception: Exception;
}

export interface Exception {
	Exception: string;
	Message: string;
	Code: number;
	File: string;
	Line: number;
	Trace: TraceLine[];
}

export interface TraceLine {
	file: string;
	line: number;
	function: string;
	class: string;
	type: string;
	args: TraceArgsObject[];
}

export type TraceArgsType = string | number | TraceArgsObject;

export interface TraceArgsObject {
	__class__: string;
	[name: string]: any;
}

export type ApiResult<T> = ApiFailureResult | ApiSuccessResult<T>;

export interface InfoResult {
	native: boolean;
}

export interface IFileInfo {
	path: string;
	name: string;
	mtime: number;
	size: number;
	directory: boolean;
	archived: boolean;
	hidden: boolean;
	readonly: boolean;
	system: boolean;
}

export interface ErrorResults {
	path: string;
	name: string;
	error: Exception;
}

export interface ConnectionDetails {
	hostname: string;
	username: string;
	workgroup: string;
	password: string;
	share: string;
}

const fetchCsrf = function(input: RequestInfo, init?: RequestInit): Promise<Response> {
	init = init || {};
	init.headers = new Headers();
	init.headers.set("requesttoken", OC.requestToken);
	console.log(input, init);
	return fetch(input, init);
}

export class SMBProvider {
	info(): Promise<InfoResult> {
		return fetchCsrf(OC.generateUrl('/apps/smb_test/info'))
			.then(response => response.json());
	}

	stat(connection: ConnectionDetails, path: string): Promise<ApiResult<IFileInfo | ErrorResults>> {
		let params = new URLSearchParams({
			...connection,
			path
		}).toString();
		return fetchCsrf(OC.generateUrl('/apps/smb_test/stat') + '?' + params)
			.then(response => response.json());
	}

	dir(connection: ConnectionDetails, path: string): Promise<ApiResult<IFileInfo[]>> {
		let params = new URLSearchParams({
			...connection,
			path
		}).toString();
		return fetchCsrf(OC.generateUrl('/apps/smb_test/dir') + '?' + params)
			.then(response => response.json());
	}
}
