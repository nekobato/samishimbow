<?php
require_once('mysqli.class.php');

$post = $_GET;

if (empty($post['id']))
{
	die("ポストがないです");
}

$select_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

if ($select_user->result_rows() > 0)
{
	echo json_encode($select_user->result_array());
}
else
{
	die("そんなユーザーないです");
}

