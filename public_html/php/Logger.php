<?php


/**
 * @author Timothy Tavonga Mugadza
 * 
 */
class Logger
{
  /**
   *
   */
  public function __construct()
  {
  }

  /**
   * @var void
   */
  public $type;

  /**
   * @var void
   */
  public $message;

  /**
   * @var void
   */
  public $datetime;

  /**
   * @var void
   */
  public $priority;

  /**
   * @param void $type
   * @param void $msg
   */
  public function log($type, $msg)
  {
    // TODO: implement here
    //$this->datetime = date("Y-m-d H:i:s");
    $this->datetime = time();
    $this->priority = $this->priority or 0;
    $vals = array("{$this->priority}", "$type", "$msg", "datetime({$this->datetime})");
    $cols = array();
    $this->priority = NULL;
    return Q_ueryBuild::insert("EventLog", $cols, $vals);
  }
}
