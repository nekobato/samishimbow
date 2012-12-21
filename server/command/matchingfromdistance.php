<?php
require_once('mysqli.class.php');

$post = $_GET;

if (empty($post['id'])) {
	die("ポストがないです");
}

$select_user = new db('SELECT tag1, tag2, tag3, X(geo) as lng, Y(geo) as lat FROM user WHERE id = "'.$post['id'].'"');

if ($select_user->result_rows() > 0) {
	$user = $select_user->result_row_array();

	$tag['tag1'] = matching($user['tag1'], $user['lng'], $user['lat']);
	$tag['tag2'] = matching($user['tag2'], $user['lng'], $user['lat']);
	$tag['tag3'] = matching($user['tag3'], $user['lng'], $user['lat']);
	
	echo json_encode($tag);
} else {
	die("そんなユーザーないです");
}

function matching($tag, $x, $y)
{
	$sql = "SELECT id, fb_id, name, X(geo) as lng, Y(geo) as lat,"
    . "GLength(GeomFromText(CONCAT('LineString({$x} {$y},', X(geo), ' ', Y(geo),')'))) AS len "
    . "FROM user "
    . "WHERE (`tag1` = '{$tag}' OR `tag2` = '{$tag}' OR `tag3` = '{$tag}') "
    . "ORDER BY len ASC "
    . "LIMIT 10";

	$maching = new db($sql);

	return $maching->result_array();
}
