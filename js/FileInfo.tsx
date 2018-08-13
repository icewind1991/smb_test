import React from 'react';
import {ErrorResults, IFileInfo} from "./SMBProvider";

import './FileInfo.css';
import {Error} from "./ApiLoadComponent";

export interface FileInfoProps {
	info: IFileInfo;
}

export function FileInfo({info}: FileInfoProps) {
	return <span>
		{info.name}: {humanFileSize(info.size)}
	</span>;
}

function getRowClass(info: IFileInfo) {
	return ['directory', 'hidden', 'archive', 'system'].filter(key => info[key]).join(' ');
}

function isErrorResult(info: IFileInfo | ErrorResults): info is ErrorResults {
	return 'error' in info;
}

function FileInfoRow(info: IFileInfo | ErrorResults, key: number) {
	if (isErrorResult(info)) {
		return <tr key={key} className='error'>
			<td colSpan={3}>
				<div>
					{info.name}
				</div>
				<Error exception={info.error} errorMessage={'Error while loading file info'} expanded={false}/>
			</td>
		</tr>;
	} else {
		return <tr key={key} className={getRowClass(info)}>
			<td>
				{info.name}
			</td>
			<td>
				{info.directory ? '' : humanFileSize(info.size)}
			</td>
			<td>
				{relative_modified_date(info.mtime)}
			</td>
		</tr>;
	}
}

export interface FileInfoTableProps {
	files: (IFileInfo | ErrorResults)[];
}

export function FileInfoTable({files}: FileInfoTableProps) {
	return <table className='fileinfo-table'>
		<thead>
		<tr>
			<th>
				Name
			</th>
			<th>
				Size
			</th>
			<th>
				Modified date
			</th>
		</tr>
		</thead>
		<tbody>
		{files.sort((a, b) => {
			if (!isErrorResult(a) && !isErrorResult(b)) {
				if (a.directory && !b.directory) {
					return -1;
				}
				if (!a.directory && b.directory) {
					return 1;
				}
			}
			return a.name.localeCompare(b.name);
		}).map(FileInfoRow)}
		</tbody>
	</table>;
}
