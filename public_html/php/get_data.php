<?php
require_once 'cfg.php';
if (isset($_SESSION['email'])){
  $email = $_SESSION['email'];
  $res = new ArrayObject();
  $a = new App();
  $qb = new Q_ueryBuild();
  $uid = $a->v_email($email, $qb, $res);
  if ($uid['c']>0 && $_SESSION['log']==2)
  {
    $u =$qb->db->prepare($qb->slct("username", 
            "Qrumb.People", "userid = {$uid['c']}"));
    if ($u->execute()){
      $as = $u->fetch(PDO::FETCH_OBJ);
      $uid['name']=$as->username;
      $uid['userstatus']= 1;
    }
  }echo json_encode($uid);
}
else{
  echo json_encode($_SESSION);
}