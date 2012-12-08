<?php
require_once('mysqli.class.php');

$post = $_GET;

$check_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

if ($check_user->result_rows() > 0) {
	$insert_user = new db('UPDATE samishimbow.user
											SET tag1 = "'.$post['tag1'].'",
													tag2 = "'.$post['tag2'].'",
													tag3 = "'.$post['tag3'].'"
											SET tag1_detail = "'.$post['tag1_detail'].'",
													tag2_detail = "'.$post['tag2_detail'].'",
													tag3_detail = "'.$post['tag3_detail'].'"
											WHERE user.id = "'.$post['id'].'"');

	$select_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

	echo json_encode($select_user->result_array());
} else {
	 echo "そんなユーザーないです";
}
