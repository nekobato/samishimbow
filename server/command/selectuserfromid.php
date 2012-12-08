<?php
require_once('mysqli.class.php');

$post = $_GET;

$select_user = new db('SELECT * FROM user WHERE id = "'.$post['id'].'"');

echo json_encode($select_user->result_array());
