<?php
/**
 * Copyright (c) 2015 Robin Appelman <icewind@owncloud.com>
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 * See the COPYING-README file.
 */

/** @var $this OC\Route\Router */

return ['routes' => [
	// page
	['name' => 'smb#info', 'url' => '/info', 'verb' => 'GET'],
	['name' => 'smb#stat', 'url' => '/stat', 'verb' => 'GET'],
	['name' => 'smb#dir', 'url' => '/dir', 'verb' => 'GET'],
]];
