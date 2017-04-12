/**
 * Generated On: 2017-1-17
 * Class: DBConnect
 */
var DBConnect = {
  URL: null,
  protocol: null,
  Key: Q_ueryBuild,
  token: null,
  DBConnect: function () {
    //Constructor
    DBConnect.protocol = new $.Deferred();
  },

  /**
   * @return {null}
   */
  connect: function () {
    //TODO: Implement Me
    var proj = DBConnect.transAct('proj');
    var tid = DBConnect.transAct('taskbars');
    var temp = DBConnect.transAct('templates');
    var cards = DBConnect.transAct('cards');    
  },

  /**
   * @param slctn {string}
   * @return {{}}
   */
  transAct: function (slctn) {
    //TODO:
    var qb = this.Key;
    var query = qb.slct("*",slctn);
    qb.db.transaction(function (tx){
      tx.executeSql(query,[],function (tx,rs){
        var info = DBConnect.sync(rs.rows);
        var i = JSON.stringify(info);
        $.post('php/data_io.php',{pnt:slctn,data:i},function(data){
        if (data.trim() !== '')
        {
          console.log('worked');
          
        }
        else{
          console.log('failed');
        }
      },'TEXT');
        return info;
      });
    });
  },

  /**
   * @param {{}} rows description
   * @return {[]}
   */
  sync: function (rows) {
    //TODO: Implement Me
    var resultsArray = [];
    for(var i=0,len=rows.length;i<len;i++) {
      var row = rows.item(i);
      var resultObj = {};
      for(var key in row) {
        resultObj[key] = row[key];
      }
      resultsArray.push(resultObj);
    }
    return resultsArray;
  }
};
