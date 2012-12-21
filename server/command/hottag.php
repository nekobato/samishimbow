<?php
require_once('mysqli.class.php');

$tags = new db('SELECT tag num FROM tag ORDER BY num DESC LIMIT 10');

if ($tags->result_rows() > 0)
{
		echo json_encode($tags->result_array());
}
else
{
	die("そんなにユーザーないです");
}
