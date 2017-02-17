<?php


/**
 * @author Timothy Tavonga Mugadza
 */
class DBConnect
{
  /**
   * @var void
   */
  public $URL;

  /**
   * @var void
   */
  public $protocol;

  /**
   * @var void
   */
  public $Key;

  /**
   * @var void
   */
  private $token;

  /**
   *
   */
  public function __construct()
  {
  }


  /**
   *
   */
  public function Connect()
  {
    // TODO: implement here
    if (file_exists("ready.x")){
      $this->URL = "mysql:host=localhost";
      $this->protocol = new PDO($this->URL, "root","password");
      $this->protocol->exec("");
      
    }
  }

  /**
   *
   */
  public function TransAct()
  {
    // TODO: implement here
  }

  /**
   *
   */
  public function Sync()
  {
    // TODO: implement here
  }
}
