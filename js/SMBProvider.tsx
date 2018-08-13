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

export class SMBProvider {
	info(): Promise<InfoResult> {
		return $.getJSON(OC.generateUrl('/apps/smb_test/info'));
	}

	stat(connection: ConnectionDetails, path: string): Promise<ApiResult<IFileInfo | ErrorResults>> {
		return $.getJSON(OC.generateUrl('/apps/smb_test/stat'), {
			...connection,
			path
		});
	}

	dir(connection: ConnectionDetails, path: string): Promise<ApiResult<IFileInfo[]>> {
		return $.getJSON(OC.generateUrl('/apps/smb_test/dir'), {
			...connection,
			path
		});
	}
}
