<?php
require_once('mysqli.class.php');

$post = $_GET;

if (empty($post)) {
	die("ポストがないです");
}

$select_user = new db('SELECT * FROM user WHERE fb_id = "'.$post['fb_id'].'"');

if ($select_user->result_rows == 0) {
	die("そんなユーザーないです");
}

echo json_encode($select_user->result_array());
