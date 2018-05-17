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

	stat(connection: ConnectionDetails, path: string): Promise<ApiResult<IFileInfo>> {
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
