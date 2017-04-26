<?php

/**
 * @author Timothy Tavonga Mugadza
 * require
 */
class UILoad {

  /**
   *
   */
  public function __construct() {
    if (session_status() > 0) {
      $this->qb = new Q_ueryBuild();
      $this->usr = $_SESSION['c'];
      if (isset($_SESSION['proj'])) {
        $this->prj = $_SESSION['proj'];
      }
      if (isset($_SESSION['cards'])) {
        $this->crds = $_SESSION['cards'];
      }
      if (isset($_SESSION['templates'])) {
        $this->tmpl = $_SESSION['templates'];
      }
      if (isset($_SESSION['taskbars'])) {
        $this->tsbr = $_SESSION['taskbars'];
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

  /**
   * @var ArrayObject flipped tsb
   */
  public $bst;

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
    $this->tsb['tmid'] = "templateid";
    $this->tsb['t_pid'] = "template_projectid";
    $this->tsb['tid'] = "taskstatusid";
    $this->tsb['tname'] = "taskstatusname";
    $this->bst = array_flip($this->tsb->getArrayCopy());
  }

  /**
   *
   */
  public function placeCards() {
    // TODO: implement here
  }

  /**
   * @param int $ID 
   */
  

  /**
   * @param void $l
   * @param void $cname
   */
  public function cardTemplate($l, $cname) {
    // TODO:
    return $l . $cname;
  }

  /**
   * Getter
   * @param void $ID
   */
  public function getProject() {
    // TODO:
    $qb = $this->qb;
    $r = $this->bst;
    $qry = $qb->slct(["projectid as pid"
        , "projectname as {$r['projectname']}"
        , "date_created as {$r['date_created']}"
        , "date_modified as {$r['date_modified']}"
        , "status as {$r['status']}"
        , "userid as author_id"
        , "projectDesc as {$r['projectDesc']}"
            ], "Qrumb.Project", "userid = ?");
    $st = $qb->transaction($qry);
    $st->execute([$_SESSION['c']]);
    $rss = $st->fetchAll() or array($r['projectid'] => -1);
    return $rss; //;
  }

  /**
   * getter
   * @return stdClass object with the Templates
   */
  public function getTemplate() {
    // TODO: test count 1 success,
    $qb = $this->qb;
    $r = $this->bst;
    $qry = $qb->slct(["templateid as {$r['templateid']} "
        , " projectid as pid "
        , " template_projectid as {$r['template_projectid']} "
//        , " project_userid as userid "
//        , " template_userid"
            //, "projectDesc as {$r['projectDesc']}"
            ], " Qrumb.Templates ", " project_userid = ? ");
    $st = $qb->transaction($qry);
    $st->execute([$_SESSION['c']]);
    $rss = $st->fetchAll() or array($r['projectid'] => -1);
//    $_SESSION['error'] = [$st->errorInfo(),$st->queryString] ;
    return $rss; //;
  }
  
  /**
   * @return stdClass object with the Tasks
   */
  public function getStatusBar() {
    // TODO: implement properly
    $qb = $this->qb;
    $r = $this->bst;
    $qry = $qb->slct(["projectid as pid "
        , " Pos as pos "
        , " taskstatusid as {$r['taskstatusid']} "
        , " taskstatusname as {$r['taskstatusname']} "
//        , " template_userid"
            //, "projectDesc as {$r['projectDesc']}"
            ], " Qrumb.TaskStatusBars ", " userid = ? ");
    $st = $qb->transaction($qry);
    $st->execute([0]);
    $rss = $st->fetchAll() or array($r['projectid'] => -1);
//    $_SESSION['error'] = [$st->errorInfo(),$st->queryString] ;
    return $rss; //;
  }
  
  /**
   * @return stdClass object with the Tasks
   */
  public function getCards() {
    // TODO: implement properly
    $qb = $this->qb;
    $r = $this->bst;
    $qry = $qb->slct(["taskid as {$r['taskid']} "
        , " cname "
        , " taskstatusid as {$r['taskstatusid']} "
        , " taskdesc as {$r['taskdesc']} "
        , " userid as assign"
        , "projectid as pid"
            ], " Qrumb.Tasks ", " userid = ? ");
    $st = $qb->transaction($qry);
    $st->execute([$_SESSION['c']]);
    $rss = $st->fetchAll() or array($r['projectid'] => -1);
//    $_SESSION['error'] = [$st->errorInfo(),$st->queryString] ;
    return $rss; //;
  }

  /**
   * 
   * this method is a setter method Tasks(cards)
   * @param void $ID
   */
  public function projCard($ID) {
    // TODO: remove assigning bug
    $qb = $this->qb;
    $t = $this->tsb;
    $d = $this->crds[$ID] or $this->crds;
    //insert Project else assigns tasks, 
    if ($this->usr == $d->assign){
      $q = $qb->insert('Qrumb.Tasks'
              , "{$t['cid']},{$t['cname']},{$t['tid']},{$t['cdesc']},{$t['pid'][0]},userid"
              , [$ID + 1, $d->cname, $d->tid, $d->cdesc, $d->pid, $d->assign]);
      $q .= "ON DUPLICATE KEY UPDATE {$t['cname']}='{$d->cname}'"
              . ", {$t['cdesc']}='{$d->cdesc}'"
              . ", {$t['assign']}='{$d->assign}'";
    }else{
      $q = $qb->insert('Qrumb.Tasks'
              , "{$t['cid']},{$t['cname']},{$t['tid']},{$t['cdesc']},{$t['pid'][0]},assign,userid"
              , [$ID + 1, $d->cname, $d->tid, $d->cdesc, $d->pid, $d->assign,$this->usr]);
      $q .= "ON DUPLICATE KEY UPDATE {$t['cname']}='{$d->cname}'"
              . ", {$t['cdesc']}='{$d->cdesc}'"
              . ", assign='{$d->assign}'";
    }
    $qb->db->query($q);
    $_SESSION['error'] = $qb->db->errorInfo();
  }

  /**
   * This is a setter method Templates
   * 
   */
  public function projTemplates($ID) {
    // TODO: remove assigning bug
    $qb = $this->qb;
    $t = $this->tsb;
    $d = $this->tmpl[$ID] or $this->tmpl;
    //insert Project
    $qb->db->query("DELETE FROM Templates where project_userid = {$this->usr}");
   
    $q = $qb->insert('Qrumb.Templates'
            , "{$t['tmid']},{$t['pid'][0]},{$t['pid'][1]},project_userid,template_userid"
            , [$ID + 1, $d->pid, $d->t_pid, $this->usr, 0]);
    $q .= "ON DUPLICATE KEY UPDATE {$t['pid'][0]}='{$d->pid}'"
            . ", {$t['pid'][1]}='{$d->t_pid}'"
            . ", project_userid ='{$this->usr}'";
    $qb->db->query($q);

    $_SESSION['error'] = $qb->db->errorInfo();
  }
  
  public function setProject($ID) {
    // TODO: implement here
    $qb = $this->qb;
    $t = $this->tsb;
    $d = $this->prj[$ID] or $this->prj;
    //insert Project
    $q = $qb->insert('Qrumb.Project'
            , "{$t['pid'][0]},{$t['pname']},date_created,status,date_modified,userid,date_expiring "
            , [$ID + 1, $d->pname, $d->date_created, $d->status, $d->date_modified, $d->author_id, $d->date_created]);
    $q .= "ON DUPLICATE KEY UPDATE {$t['pname']}='{$d->pname}'"
            . ",{$t['date_modified']}= now(), {$t['pDesc']}='{$d->pDesc}'"
            . ",{$t['status']}='{$d->status}'";
    $qb->db->query($q);
      $_SESSION['error'] = $qb->db->errorInfo();
    
  }

  /**
   * setter method Taskbar
   * @param void $id
   * @return int
   */
  public function placeTaskBar($id) {
    // TODO: implement here
    $qb = $this->qb;
    $t = $this->tsb;
    $d = $this->tsbr[$id] or $this->tsbr;
    //insert Project
    $q = $qb->insert('Qrumb.TaskStatusBars'
            , "{$t['tid']},{$t['tname']},{$t['pid'][0]},{$t['pos']},userid"
            , [$id + 1, $d->tname, $d->pid, $d->pos, 0]);
    $q .= "ON DUPLICATE KEY UPDATE {$t['tname']}='{$d->tname}'"
            . ", {$t['pid'][0]}='{$d->pid}'"
            . ",{$t['pos']}='{$d->pos}'";
    if (!$qb->db->query($q)) {
      $_SESSION['error'] = $qb->db->errorInfo();
    } else {
      $_SESSION['error'] = $qb->db->errorInfo();
    }
  }

}
