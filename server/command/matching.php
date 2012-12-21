<?php
require_once('mysqli.class.php');

$post = $_GET;

if (empty($post['id'])) {
	die("ポストがないです");
}

$select_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

if ($select_user->result_rows() > 0) {
	$user = $select_user->result_row_array();

	$tag['tag1'] = maching($user['tag1']);
	$tag['tag2'] = maching($user['tag2']);
	$tag['tag3'] = maching($user['tag3']);
	
	echo json_encode($tag);
} else {
	die("そんなユーザーないです");
}

function maching($tag)
{
	$maching = new db('SELECT id, name FROM user WHERE tag1 = "'.$tag.'" OR tag2 = "'.$tag.'" OR tag3 = "'.$tag.'"');

	return $maching->result_array();
}
