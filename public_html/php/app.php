<?php


/**
 * This class/object will manage create, read, edit and  delete
 * @author Timothy Tavonga Mugadza
 */
class app
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
