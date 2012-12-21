<?php
require_once('mysqli.class.php');

$post = $_GET;

$check_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');



if ($check_user->result_rows() > 0) {

	$user = $check_user->result_row_array();

	oldtag($user['tag1']);
	oldtag($user['tag2']);
	oldtag($user['tag3']);

	$insert_user = new db('UPDATE samishimbow.user
											SET tag1 = "'.$post['tag1'].'",
													tag2 = "'.$post['tag2'].'",
													tag3 = "'.$post['tag3'].'",
											    tag1_detail = "'.$post['tag1_detail'].'",
													tag2_detail = "'.$post['tag2_detail'].'",
													tag3_detail = "'.$post['tag3_detail'].'"
											WHERE user.id = "'.$post['id'].'"');

	newtag($post['tag1']);
	newtag($post['tag2']);
	newtag($post['tag3']);

	$select_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

	echo json_encode($select_user->result_array());
} else {
	 echo "そんなユーザーないです";
}

function newtag($tag)
{
	$tag_existence = new db('SELECT tag FROM tag WHERE tag = "'.$tag.'"');

	if ($tag_existence->result_rows() > 0)
	{
		$inc_tag = new db('UPDATE tag SET num = num+1 WHERE tag = "'.$tag.'"');
	}
	else
	{
		$make_tag = new db('INSERT INTO tag (tag, num) VALUES ("'.$tag.'", 1)');
	}
}

function oldtag($tag)
{
	$tag_existence = new db('SELECT tag FROM tag WHERE tag = "'.$tag.'"');

	if ($tag_existence->result_rows() > 0)
	{
		$inc_tag = new db('UPDATE tag SET num = num - 1 WHERE tag = "'.$tag.'"');
	}
	else
	{
		// do nothing	
	}
}
