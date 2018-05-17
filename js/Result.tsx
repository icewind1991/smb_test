import React from 'react';
import {ConnectionDetails, IFileInfo, SMBProvider} from "./SMBProvider";
import {FileInfoTable} from "./FileInfo";
import {ApiLoadComponent} from "./ApiLoadComponent";

export interface ResultProps {
	smbProvider: SMBProvider;
	connectionDetails: ConnectionDetails;
}

export function Result({connectionDetails, smbProvider}: ResultProps) {
	return <div>
		<ApiLoadComponent
			errorMessage='Error while loading share content.'
			load={() => smbProvider.dir(connectionDetails, '')}
			placeholder='Loading share content'
			renderer={files => <FileInfoTable files={files}/>}
		/>
	</div>;
}
