<?php
require_once 'cfg.php';
/**
 * this script removes data from database
 */
if (session_status() == PHP_SESSION_ACTIVE){
  if ($_SESSION['log'] == 2){
    if (filter_input(INPUT_POST, "submit")==1){
      $a = new App();
      $a->qt = 0;
      $id = filter_input(INPUT_POST, "all");
      $st1=$a->delete(1, $id);
      $st2=$a->delete(2, $id);
      if($st1&&$st2){if($st1->errorCode()&&$st1->errorCode())echo '{"msg":"success"}';}
      else {echo '{"msg":"fail"}';}
      
    }
    if (filter_input(INPUT_POST, "submit")==2){
      $a = new App();
      //$d = new Q_ueryBuild();
      $id = filter_input(INPUT_POST, "all") or 0;
      $a->qt = filter_input(INPUT_POST, "cid");
      $st1 = $a->delete(1, $id);
      if($st1->errorCode()==0){echo '{"msg":"success"}';}
      else {echo '{"msg":"fail"}';}
    }
    
  }
  else{
    echo '{"error":"1","msg":"not logged in"}';
  }
}