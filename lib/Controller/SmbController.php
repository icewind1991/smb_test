<?php

/**
 * @copyright Copyright (c) 2018 Robin Appelman <robin@icewind.nl>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\SMBTest\Controller;

use Icewind\SMB\AnonymousAuth;
use Icewind\SMB\IFileInfo;
use Icewind\SMB\Native\NativeServer;
use Icewind\SMB\ServerFactory;
use Icewind\SMB\System;
use OCA\SMBTest\ExceptionSerializer;
use OCA\SMBTest\ShareFactory;
use OCP\AppFramework\Controller;
use OCP\IRequest;

class SmbController extends Controller {
	private $shareFactory;

	public function __construct(
		$AppName,
		IRequest $request,
		ShareFactory $shareFactory,
	) {
		parent::__construct($AppName, $request);
		$this->shareFactory = $shareFactory;
	}

	public function info() {
		if (class_exists('Icewind\SMB\ServerFactory')) {
			$auth = new AnonymousAuth();
			$factory = new ServerFactory();
			$server = $factory->createServer('', $auth);
			return [
				'native' => $server instanceof NativeServer
			];
		} else {
			return [
				'native' => NativeServer::available(new System())
			];
		}
	}

	/**
	 * @param string $hostname
	 * @param string $username
	 * @param string $workgroup
	 * @param string $password
	 * @param string $share
	 * @param string $path
	 * @return array
	 */
	public function stat($hostname, $username, $workgroup, $password, $share, $path) {
		try {
			$share = $this->shareFactory->getShare($hostname, $username, $workgroup, $password, $share);
			$data = $this->encodeFileInfo($share->stat($path));
			return [
				'success' => true,
				'data' => $data
			];
		} catch (\Exception $e) {
			return [
				'success' => false,
				'exception' => $this->encodeException($e)
			];
		}
	}

	/**
	 * @param string $hostname
	 * @param string $username
	 * @param string $workgroup
	 * @param string $password
	 * @param string $share
	 * @param string $path
	 * @return array
	 */
	public function dir($hostname, $username, $workgroup, $password, $share, $path) {
		try {
			$share = $this->shareFactory->getShare($hostname, $username, $workgroup, $password, $share);
			$root = $this->encodeFileInfo($share->stat($path));
			$data = array_map([$this, 'encodeFileInfo'], $share->dir($path));
			$data[] = $root;
			return [
				'success' => true,
				'data' => $data
			];
		} catch (\Exception $e) {
			return [
				'success' => false,
				'exception' => $this->encodeException($e)
			];
		}
	}

	private function encodeFileInfo(IFileInfo $info) {
		try {
			$info->isHidden();
			return [
				'path' => $info->getPath(),
				'name' => $info->getName(),
				'mtime' => $info->getMTime(),
				'size' => $info->getSize(),
				'directory' => $info->isDirectory(),
				'archived' => $info->isArchived(),
				'hidden' => $info->isHidden(),
				'readonly' => $info->isReadOnly(),
				'system' => $info->isSystem(),
			];
		} catch (\Exception $e) {
			return [
				'path' => $info->getPath(),
				'name' => $info->getName(),
				'error' => $this->encodeException($e)
			];
		}
	}

	private function encodeException(\Exception $e) {
		return (new ExceptionSerializer())->serializeException($e);
	}
}
