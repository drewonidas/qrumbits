<?php


/**
 * @author Timothy Tavonga Mugadza
 * require
 */
class UILoad
{
  /**
   *
   */
  public function __construct()
  {
    if(session_status() > 0){
      $this->qb = new Q_ueryBuild();
      $this->usr = $_SESSION['c'];
      if(isset($_SESSION['proj'])){
        $this->prj = $_SESSION['proj'];
      }
      if(isset($_SESSION['cards'])){
        $this->crds = $_SESSION['cards'];
      }
      if(isset($_SESSION['templates'])){
         $this->tmpl=$_SESSION['templates'];
      }
      if(isset($_SESSION['taskbars'])){
         $this->tsbr=$_SESSION['taskbars'];
      }
      $this->tsb = new ArrayObject();
      $this->settsb();
//      $this->tsb['cdesc'] = "";
    }
  }

  /**
   * @var ArrayObject
   */
  public $prj;

  /**
   * @var ArrayObject
   */
  public $tsbr;
  
  /**
   * @var ArrayObject
   */
  public $tmpl;
  
  /**
   * @var void
   */
  public $pid;

  /**
  * @var int
  */
  public $usr;
  /**
   * @var ArrayObject
   */
  public $tsb;

  /**
   * @var ArrayObject
   */
  public $crds;
  /**
   * @var Q_ueryBuild
   */
  public $qb;
  
  private function settsb() {
    //TODO: implement mapping
    $this->tsb['cid'] = "taskid";
    $this->tsb['cname'] = "cname";
    $this->tsb['pid'] = ["projectid", "template_projectid"];
    $this->tsb['author_id'] = "userid";
    $this->tsb['assign'] = "userid";
    $this->tsb['pos'] = "Pos";
    $this->tsb['cdesc'] = "taskdesc";
    $this->tsb['pname'] = "projectname";
    $this->tsb['pDesc'] = "projectDesc";
    $this->tsb['status'] = "status";
    $this->tsb['date_created'] = "date_created";
    $this->tsb['date_modified'] = "date_modified";
    $this->tsb['tmid'] = "tmid";
    $this->tsb['t_id'] = "template_projectid";
    $this->tsb['tid'] = "taskstatusid";
    $this->tsb['tname'] = "taskstatusname";
  }
  
  /**
   *
   */
  public function placeCards()
  {
    // TODO: implement here
  }

  /**
   * @param int $ID 
   */
  public function selectProject($ID)
  {
    // TODO: implement here
    $qb = $this->qb;
    $t = $this->tsb;
    $d = $this->prj[$ID];
    //insert Project
    $q = $qb->insert('Qrumb.Project'
            ,"{$t['pid'][0]},{$t['pname']},date_created,status,date_modified,userid,date_expiring "
            ,[$d->pid,$d->pname,$d->date_created,$d->status,$d->date_modified,$d->author_id, $d->date_created]);
    $q .= "ON DUPLICATE KEY UPDATE {$t['pname']}='{$d->pname}'" 
    . ",{$t['date_modified']}= now(), {$t['pDesc']}='{$d->pDesc}'" 
    . ",{$t['status']}='{$d->status}'" ;
    if (!$qb->db->query($q)){
      $_SESSION['error'] = $qb->db->errorInfo();
    }else{
      $_SESSION['error'] = $qb->db->errorInfo();
    }
  }

  /**
   * @param void $id
   * @return int
   */
  public function placeTaskBar($id)
  {
    // TODO: implement here
    $qb = $this->qb;
    $t = $this->tsb;
    $d = $this->tsbr[$id];
    //insert Project
    $q = $qb->insert('Qrumb.TaskStatusBars'
            ,"{$t['tid']},{$t['tname']},{$t['pid'][0]},{$t['pos']},userid"
            ,[$d->tid,$d->tname,$d->pid,$d->pos,0]);
    $q .= "ON DUPLICATE KEY UPDATE {$t['tname']}='{$d->tname}'" 
    . ", {$t['pid'][0]}='{$d->pid}'" 
    . ",{$t['pos']}='{$d->pos}'" ;
    if (!$qb->db->query($q)){
      $_SESSION['error'] = $qb->db->errorInfo();
    }else{
      $_SESSION['error'] = $qb->db->errorInfo();
    }
  }

  /**
   * @param void $l
   * @param void $cname
   */
  public function cardTemplate($l, $cname)
  {
    // TODO: implement here
    return 0;
  }

  /**
   * @param void $ID
   */
  public function getProject($ID)
  {
    // TODO: implement here
  }

  /**
   * @param void $ID
   */
  public function projCard($ID)
  {
    // TODO: remove assigning bug
    $qb = $this->qb;
    $t = $this->tsb;
    $d = $this->crds[$ID];
    //insert Project
    $q = $qb->insert('Qrumb.Tasks'
            ,"{$t['cid']},{$t['cname']},{$t['tid']},{$t['cdesc']},{$t['pid'][0]},userid"
            ,[$d->cid,$d->cname,$d->tid,$d->cdesc,$d->pid,$this->usr]);
    $q .= "ON DUPLICATE KEY UPDATE {$t['cname']}='{$d->cname}'" 
    . ", {$t['cdesc']}='{$d->cdesc}'" 
    . ", {$t['assign']}='{$this->usr}'" ;
    $qb->db->query($q);
    if (!$qb->db->query($q)){
      $_SESSION['error'] = $qb->db->errorInfo();
    }
    else{
      $_SESSION['error'] = $qb->db->errorInfo();
    }
  }
}
