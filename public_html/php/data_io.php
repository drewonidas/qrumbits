<?php
require_once 'cfg.php';
/* 
 * 
 */
$data = new ArrayObject();
if (strlen(filter_input(INPUT_POST, 'pnt'))>0){
  $_SESSION[filter_input(INPUT_POST, 'pnt')] = json_decode(filter_input(INPUT_POST, 'data'));
  $data[filter_input(INPUT_POST, 'pnt')] = json_decode(filter_input(INPUT_POST, 'data'));
  try {
    $mv = new UILoad();
    $mv->usr = isset($data['usr'])?$data['usr']:$mv->usr;
    if (isset($data['cards'])) {
      for ($a = 0; $a < count($data['cards']); $a++) {
        $mv->projCard($a);
      }
    }
    if (isset($data['proj'])) {
      for ($a = 0; $a < count($data['proj']); $a++) {
        $mv->setProject($a);
      }
    }
    if (isset($data['taskbars'])) {
      for ($a = 0; $a < count($data['taskbars']); $a++) {
        $mv->placeTaskBar($a);
      }
    }
    //TODO: implement template records
    if (isset($data['templates'])){
      for($a = 0;$a < count($data['templates']);$a++){
        $mv->projTemplates($a);
      }
    }
  } catch (Exception $exc) {
    $_SESSION['error'] = $exc->getTraceAsString();
  }

  
}
echo json_encode([$data,$_SESSION['error']]);