
var projs = {pid:null,pname:null,date_created:null,date_modified:null,status:null,author_id:null,pDesc:null};
var crds = {cid:null,cname:null,tid:null,cdesc:null,pid:null,assign:null};
var Q_ueryBuild = Q_ueryBuild || {};
var Logger = Logger || {};
var app = app || {};
/**
 * Created On: 2017-1-17
 * Class: DBConnect
 */

var DBConnect = {
  URL: null,
  protocol: null,
  Key: Q_ueryBuild,
  token: null,
  shift:1,
  mapp:{},
  fetch:4,
  DBConnect: function () {
    //Constructor
    DBConnect.protocol = new $.Deferred();
  },
  /**
   * @return {null}
   */
  connect: function () {
    //TODO: Implement Me
    this.token = {};
    DBConnect.URL = 0;
    //this.token['cnt'] = 0;
    DBConnect.mapp.usr = localStorage.getItem('usr');
    window.addEventListener('syncU', Logger.logE);
    DBConnect.transAct('proj');
    DBConnect.transAct('taskbars');
    DBConnect.templateRoutine();
    DBConnect.transAct('cards');
    var iv = setInterval(function () {
      if (DBConnect.URL === 4) {

        var c = {};
        c = DBConnect.token;
        c.usr = localStorage.getItem('usr');
        c.code = 0;
        DBConnect.evm(c, localStorage.getItem('usr'));
        app.cltime(iv);
        localStorage.setItem('Sync',0); 
        DBConnect.token = null;
        alert("SYncing");
      }

    }, app.qt);
    //DBConnect.evm(this.token,localStorage.getItem('usr'));

  },
  
  conSync: function (id,usr) {
    //TODO: Implement Me
    this.token = {};
    DBConnect.URL = 0;
    //this.token['cnt'] = 0;
    //var qadd = " WHERE ";
    DBConnect.mapp.usr = id;
    window.addEventListener('syncU', Logger.logE);
    DBConnect.transAct('proj WHERE pid ='+id +"author_id ="+usr);
    DBConnect.transAct('taskbars');
    DBConnect.templateRoutine();
    DBConnect.transAct('cards WHERE pid ='+id );
    var iv = setInterval(function () {
      if (DBConnect.URL === 4) {

        var cx = {};
        cx = DBConnect.token;
        cx.usr = localStorage.getItem('usr');
        cx.code = 0;
        //console.log(JSON.stringify(c));
        DBConnect.evm(cx, localStorage.getItem('usr'));
        app.cltime(iv);
        //alert('done');
        DBConnect.token = null;

      }

    }, app.qt);
    //DBConnect.evm(this.token,localStorage.getItem('usr'));

  },
  /**
   * @param slctn {string}
   * @return {{}}
   */
  transAct: function (slctn) {
    //TODO:
    var qb = this.Key;
    var query = qb.slct("*", slctn);
    qb.db.transaction(function (tx) {
      tx.executeSql(query, [], function (tx, rs) {
        var info = DBConnect.sync(rs.rows);
        var i = JSON.stringify(info);
        DBConnect.token[slctn] = i;
        //DBConnect.token['cnt']++;
        $.post('php/data_io.php', {pnt: slctn, data: i,usr:DBConnect.mapp.usr}, function (data) {
          if (data.trim() !== '')
          {
            console.log('worked');
            DBConnect.URL++;
          } else {
            console.log('failed');
          }
        }, 'TEXT');
        return info;
      });
    });
  },
  /**
   * 
   * @return {{}}
   */
  templateRoutine: function () {
    //TODO:
    var qb = this.Key;
    var slctn = 'templates';
    var query = qb.slct("tmid, t_pid, m.pid", slctn + " , proj as m", ' m.pid = templates.pid and m.author_id =' + localStorage.usr);
    qb.db.transaction(function (tx) {
      tx.executeSql(query, [], function (tx, rs) {
        var info = DBConnect.sync(rs.rows);
        var i = JSON.stringify(info);
        DBConnect.token[slctn] = i;
        //console.log((i === null)?'nothing':i);
        $.post('php/data_io.php', {pnt: slctn, data: i}, function (data) {
          if (data.trim() !== '')
          {
            console.log('worked');
            DBConnect.URL++;
          } else {
            console.log('failed');
          }
        }, 'TEXT');
        return info;
      });
    });
  },
  getdata: function (slctn,what) {
    var qb = this.Key;
    var query = qb.slct("*", slctn,what);
    qb.db.transaction(function (tx) {
      tx.executeSql(query, [], function (tx, rs) {
        DBConnect.token = DBConnect.sync(rs.rows);
        //DBConnect.token['cnt']++;
        
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
    for (var i = 0, len = rows.length; i < len; i++) {
      var row = rows.item(i);
      var resultObj = {};
      for (var key in row) {
        resultObj[key] = row[key];
      }
      resultsArray.push(resultObj);
    }
    return resultsArray;
  },
  /**
   * @param {{}} dat description
   * @return {[]}
   */
  syncD: function (dat) {
    //TODO: Implement Me
    for (var val in dat)
    {
      console.log(val, dat[val]);
    }
  },
  /**
   * 
   * @param {{}} dat input
   * @param {{}} org original
   * @param {{}} idx1  key 1 -> dat[idx1]
   * @param {{}} idx2  key 2 -> dat[idx2]
   * @return {[]}
   */
  ndiff: function (dat, org, idx1, idx2) {
    //TODO: Implement Me
    try {
      if (dat[idx1]!==undefined&&org[idx1]!==undefined)
        console.log('dat',dat,'org',org);
      return (dat[idx1] === org[idx1] &&
              dat[idx2] === org[idx2]);
    }catch(ex){
      //this.connect();
      return false;
      
   }
  },
  /**
   * event manager
   * @param {string} message what ever messsage
   * @param {string} type description
   * */
  evm: function (message, type) {
    var v = [];
    v = message;
    this.protocol = new CustomEvent('syncU', {detail: v});
    window.dispatchEvent(DBConnect.protocol);
  },
  /**
   * data manager, projects remembers shift
   * @param {{}} data obj
   * @param {int} idx index to start,
   * @param {string} idn index name
   * @param {string} tbl table name
   * */
  datawr:function (data,idx,idn,tbl){
    var i = data['dat'];
    var o = data['org'];
    var qc = [];
    var qd = [];
    //var ix = [];
   //console.log(o,i);
    if (i === o)return;
    this.shift = idn === 'pid'? idx : 0;
    for (var a in projs){
      qc.push(a);
      if (a !== idn){
        //console.log(i[a]===""?"emt":i[a]);
        qd.push("'" + i[a] + "'");
      }else{
        qd.push(parseInt(i[a]) + idx);
        //ix.push(parseInt(i[a]) + idx);
      }
      //$('.modal').modal('hide');
    }
    //console.log("datastreams",qc,qd);
    DBConnect.Key.transaction(this.Key.insert(tbl,qc,qd));
    //console.log((parseInt(i[a]) +  parseInt(idx)));
    var tmpl = data['r']['templates'];
    if (tmpl.length > 0){
      for (var x in tmpl)
        if(tmpl[x]['pid'] === i['pid']){ 
          DBConnect.Key.transaction(DBConnect.Key.insert("templates",
                  ['t_pid', 'pid','tmid'], [tmpl[x]['t_pid'],(parseInt(i['pid']) + parseInt(idx)),tmpl[x]['tmid']]));
                  break;
                }
    }
    else
        DBConnect.Key.transaction(DBConnect.Key.insert("templates",
                ['t_pid', 'pid'], [1,(parseInt(i['pid']) + parseInt(idx))]));


    var d = data['r']['cards'];
    //DBConnect.getdata('cards','cid  =  cid');
    //console.log(DBConnect.fetch);
    this.datac(d,i);
    //DBConnect.fetch++;
  },
  
  datac:function (d,i){
    
     setTimeout(function (){
      var q = [];
      q[0] = crds;
      var qc;
      var qd;
      //console.log()
      for (var z = 0; z < d.length;z++){
        qc = [];
        qd = [];
        if (parseInt(d[z]['pid']) === parseInt(i['pid'])){//
          for (var a in q[0]){

              qc.push(a);
              if (a !== 'pid'){
                //console.log(i[a]===""?"emt":i[a]);
                qd.push("'" + ((d[z][a]===undefined)?' ':d[z][a]) + "'");
              }else{
                qd.push(parseInt(i[a]) + parseInt(DBConnect.shift));
                //ix.push(parseInt(i[a]) + idx);
              }

          }
          
          DBConnect.Key.transaction(DBConnect.Key.insert('cards',qc,qd));
          DBConnect.fetch++;
        }//
      }
      //$('.modal').modal('hide');
     
      
    },app.qt);
  }
};
