import React from 'react';
import {IFileInfo} from "./SMBProvider";

import './FileInfo.css';

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

function FileInfoRow(info: IFileInfo, key: number) {
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

export interface FileInfoTableProps {
	files: IFileInfo[];
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
			if (a.directory && !b.directory) {
				return -1;
			}
			if (!a.directory && b.directory) {
				return 1;
			}
			return a.name.localeCompare(b.name);
		}).map(FileInfoRow)}
		</tbody>
	</table>;
}
