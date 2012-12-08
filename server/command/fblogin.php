<?php
require_once('mysqli.class.php');

$post = $_GET;

$select_user = new db('SELECT * FROM user WHERE fb_id = "'.$post['fb_id'].'"');

if ($select_user->result_rows() > 0) {
	echo json_encode($select_user->result_array());
} else {
	$insert_user = new db('INSERT INTO samishimbow.user
									(id, name, fb_id, geo)
									VALUES (NULL, "'.$post['name'].'", "'.$post['fb_id'].'", GeomFromText(NULL));');

	$select_user = new db('SELECT * FROM user WHERE fb_id = "'.$post['fb_id'].'"');

	echo json_encode($select_user->result_array());
}
