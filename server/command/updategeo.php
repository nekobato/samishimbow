<?php
require_once('mysqli.class.php');

$post = $_GET;

$geo = $post['geox'] . " " . $post['geoy'];

$select_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

if ($select_user->result_rows() > 0) {
	$insert_user = new db('UPDATE samishimbow.user
												 SET geo = GeomFromText("'.$geo.'"),
												 WHERE user.id = "'.$post['id'].'"');
	echo "success";
} else {
	 echo "そんなユーザーないです";
}
