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
   * @var PDO Description
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
    $this->connect();
  }


  /**
   *
   */
  public function Connect()
  {
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
      $this->protocol = new PDO($this->URL, base64_decode("cm9vdAo="),  
                base64_decode( "cGFzc3dvcmQK"),"qrumb");
    
    }  catch (Exception $ex){
       echo json_decode([$ex]);
    }
  }

  /**
   * 
   */
  public function TransAct()
  {
    $this->token = $this->protocol->prepare($this->Key);
    $this->protocol->exe($this->token);
  }

  /**
   *
   */
  public function Sync()
  {
    $this->Transact();
  }
}
