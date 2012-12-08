<?php
require_once('mysqli.class.php');

$post = $_GET;

$select_user = new db('SELECT * FROM user WHERE fb_id = "'.$post['fb_id'].'"');

if ($select_user->result_rows() > 0) {
	echo json_encode($select_user->result_array());
} else {
	if (! 
		isset($post['img_url'])) { $post['img_url'] = 0; }
	$insert_user = new db('INSERT INTO samishimbow.user
									(id, name, fb_id, tag1, tag2, tag3, img_url, geo)
									VALUES (NULL, "'.$post['name'].'", "'.$post['fb_id'].'", "tag1", "tag2", "tag3", "'.$post['img_url'].'", GeomFromText(NULL));');

	$select_user = new db('SELECT * FROM user WHERE fb_id = "'.$post['fb_id'].'"');

	echo json_encode($select_user->result_array());
}
