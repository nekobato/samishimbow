<?php
$command = $_GET['c'];

require_once('command/' . $command . '.php');
