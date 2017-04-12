<?php


/**
 * This class/object will manage create, read, edit and  delete
 * @author Timothy Tavonga Mugadza
 */
class App
{
  /**
   * This class/object will manage create, read, edit and  delete
   */
  public function __construct()
  {
  }

  /**
   * @var void
   */
  public $colNames;

  /**
   * @var void
   */
  public $cardCount;

  /**
   * @var void
   */
  public $cards;

  /**
   * @var void query time;
   */
  public static $qt;

  /**
   * @var void
   */
  public $projtype;
  /**
   * @var Q_ueryBuild
   */
  public $qb;
  /**
  * requires the session to be running
   * @param ArrayObject $res Description
  */
  public function v_email($email, $qb, $res)
  {
    try {
      
      if (session_status() == PHP_SESSION_DISABLED || 
    session_status() == PHP_SESSION_NONE){ 
    throw(new Exception("No Session"));}
      
      $q = $qb->slct("userid as c", "Qrumb.People", "useremail = ?");
      $st = $qb->transaction($q);
      if ($st->execute([$email])) {
        
        $rs = $st->fetch(PDO::FETCH_OBJ);
        //echo json_encode($res);
        $this->test($rs, $email);
        //$res->append(array("c"=>$rs->c));
        $res['c'] = $rs->c;
        
        //$_SESSION['message'] = "vemail f";
      } else {
        $res["userid"] = $st->errorInfo();
        $_SESSION['state'] = 0;
        
        //echo json_encode($res);
        //exit();
      }
    } catch (Exception $exc) {
      $_SESSION['erv'] = $exc->getTraceAsString();
    }
    return $res;
  }
  
  private function test($res,$email){
    if (property_exists($res,'c')) {
          $_SESSION['email'] = $email;
          $_SESSION['state'] = 1;
        } else {
          $_SESSION['email'] = "no email or c:$email";
          $_SESSION['state'] = 0;
        }
  }
  /**
  * requires the session to be running
  * 
  */
  public function verify()
  {
    
  }
  /**
  * requires the session to be running
  * @param PDO $db Description
  */
  public function last_in($db)
  {
    if ($db != NULL){
      $st = $db->query("SELECT userid AS c FROM Qrumb.People"
              . " ORDER BY userid desc limit 1");
      $res = $st->fetch(PDO::FETCH_OBJ);
      //$_SESSION['trace'] = $st->errorInfo();
      if ($st){return $res->c;}
      else
      {return '1';}
      //$st->execute();
      //$res = $st->fetch(PDO::FETCH_OBJ);
      
    }
    else{
      return 1;
    }
  }
  /**
   * Creates a Project Entry
   * @param void $name
   */
  public function createProj($name)
  {
    // TODO: implement here
  }

  /**
   * TaskStatus bar
   * naming convention tid_1_0
   * 1 project id (pid)
   * 0 position of the column(0)
   * @param void $name
   * @param void $pos
   */
  public function createTaskBar($name, $pos)
  {
    // TODO: implement here
  }

  /**
   * task (card) naming convetion
   *
   * id=ts_1_2 _10
   *
   * 1 = project id (pid);
   * 2 =  taskbar in which task it it is located
   * 3 = taskid count;
   * @param void $name
   */
  public function createCard($name)
  {
    // TODO: implement here
  }

  /**
   * @param void $id
   * @param void $colum
   * @param void $value
   */
  public function editCard($id, $colum, $value)
  {
    // TODO: implement here
  }

  /**
   * @param void $id
   * @param void $col
   * @param void $value
   */
  public function editProj($id, $col, $value)
  {
    // TODO: implement here
  }

  /**
   * @param void $Projid
   */
  public function read($Projid)
  {
    // TODO: implement here
  }

  /**
   * @param void $type
   * @param void $id
   * @return integer
   */
  public function delete($type, $id)
  {
    // TODO: implement here
    return null;
  }
}
