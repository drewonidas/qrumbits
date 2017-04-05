<?php
session_start();
//error_reporting( E_ALL );
//ini_set('display_errors', 1);
//header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: http://localhost:8383 ");
//header("access-control-allow-origin: http://localhost ");
require_once 'Q_ueryBuild.php';
require_once 'app.php';
