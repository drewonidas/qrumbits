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
    try{
      if (!file_exists("ready.q")){
        $this->URL = "mysql:host=localhost";
        $this->protocol = new PDO($this->URL, base64_decode("cm9vdAo="),  
                base64_decode( "cGFzc3dvcmQK"));
        $sql = file_get_contents('php/mysql.sql');
        $this->protocol->exec($sql);
        $f = fopen("ready.q", 'w');
        fwrite($f, $sql) or die("QERR Permissions");
        fclose($f);
      }
    
    }  catch (Exception $ex){
       echo json_decode([$ex]);
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
