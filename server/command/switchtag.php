<?php
require_once('mysqli.class.php');

$post = $_GET;

$check_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

if ($check_user->result_rows() > 0) {
	$insert_user = new db('UPDATE samishimbow.user
											SET tag1_enable = "'.$post['tag1'].'",
													tag2_enable = "'.$post['tag2'].'",
													tag3_enable = "'.$post['tag3'].'"
											WHERE user.id = "'.$post['id'].'"');

	$select_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

	echo json_encode($select_user->result_array());
} else {
	 echo "そんなユーザーないです";
}
