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

namespace OCA\SMBTest;

use Icewind\SMB\BasicAuth;
use Icewind\SMB\ServerFactory;

class ShareFactory {
	public function getShare($hostname, $username, $workgroup, $password, $share) {
		$auth = new BasicAuth($username, $workgroup, $password);
		$factory = new ServerFactory();
		$server = $factory->createServer($hostname, $auth);
		return $server->getShare($share);
	}
}
