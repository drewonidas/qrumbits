
/**
 * @description UILoad and Q_ueryBuild supresses Dev-Time  Errors
 */
var UILoad = UILoad || {};
var Q_ueryBuild = Q_ueryBuild || {};
/**
 * @description created On: 2017-1-17
 * Last Edit: 
 * Description: This class/object will manage create, read, edit and  delete
 */
var app = {
  colNames: [],
  cardCount: 0,
  /**
   * @description query time
   * */
  qt: 220, //220 optimum
  projtype: 0,
  lst: {},
  cards: {},
  qb: Q_ueryBuild,
  q: "",
  app: function () {
    //Constructor
    console.log("appinit");
    c = localStorage.getItem('c') ||this.qb.sinit();
    
    UILoad.pid = localStorage.getItem("pid");
    if (UILoad.pid >= 1) {

      app.read();
    } else {
      console.log("proj land");
      var pr = {};
      this.qb.db.transaction(function (tx) {
        tx.executeSql(app.qb.slct(['pid as tip', 'pid', 'pname as nm'], 'proj',
                'author_id = ' + localStorage.usr)
                , [], function (tx, rs) {
          pr = rs.rows;
          var obj = {
            item: function (i) {
              if (i === 0)
                return{tid: 'p0', nm: 'Active Projects'};
              return{tid: 'p1', nm: 'My Projects'};
            }
          };
          //console.log(obj.item(0).nm);
//        for (var a = 0; a <= obj.length; a++)
//          console.log(obj.item(a).nm);
          //if (UILoad.pid >= -100) {//untested change
            $('#landing').append(UILoad.placeTaskBar(obj, 0, 0, 4));
            $('#landing').append(UILoad.placeTaskBar(obj, 0, 1, 4));
            app.list();
          //}
        });
      }, function (er) {
        console.log(er);
      });
    }
  },
  /**
   * @documentation: Creates a Project Entry
   *    
   * @param {string} name description
   * @param {int} usr userid
   * @param {int} prty Project Template to use 
   * @return {null}
   */
  createProj: function (name, usr, prty) {
    //TODO: Implement Me 
    //if usr > 0
    $(".modal").modal('hide');
    var p = 1;
    var qb = app.qb;
    var inp = [];
    if (usr > 0){
      var q = this.qb.slct('pid', 'proj', "pid = pid ORDER BY pid DESC LIMIT 1");
      try{
        qb.db.transaction(function (tx) {
          tx.executeSql(q, [], function (tx, rs) {
            if (rs.rows.length > 0)
              p = rs.rows.item(0).pid + 1;  
          });
        }, function (err) {
          console.log(err);
        });
      }catch (ex){
        console.log(ex);
        pid0();
      }
      var i = setTimeout(function () {
        if (p === 0 || p === undefined)
          p = 1;
        if ((p !== undefined || p !== 0)) {
          var ins = qb.insert("proj",
                  ['pid', 'pname', 'date_created', 'date_modified', 'status', 'author_id'],
                  [p, '"' + name + '"', 'date()', 'date()', '"a"', '"' + usr + '"']);
          var ins0 = qb.insert("templates",
                  ['t_pid', 'pid'], [app.projtype, p]);
          app.cltime(i);
          qb.transaction(ins);
          qb.transaction(ins0);
          UILoad.pid = p;
          localStorage.setItem("pid", UILoad.pid);
          viewToggle();
          
          console.log(ins0, ins);
        }
      }, app.qt);
    }
    else if (usr === 0);
     {
      var nm = $('#ctn').val();
      for(var x = 0;x < 5;x++)
        inp[x] = $('#ct_'+ parseInt(x+1).toString()).val();
      var i = setInterval(function () {
        if (p === 0 || p === undefined)
          p = 1;
        if ((p !== undefined || p !== 0)) {
          window.ct = (window.ct===1)?2:window.ct;
          localStorage.setItem(nm,window.ct);
          for (var x = 1; x <= window.co; x++){
            var ins0 = qb.insert("taskbars",
                      ['tid', 'pid', 'tname', 'pos'],
                      [parseInt(x+parseInt(c)), window.ct , '"' + inp[x-1] + '"', x-1]);
            app.qb.transaction(ins0);
          }
          localStorage.ct++;
          app.qb.transaction(ins);
          var base = document.createElement("div");
          //console.log("#tid_0_p0");
          $(base).appendTo('#tid_0_p0');
          console.log(nm);
          var crd = UILoad.projCard(p,nm,"template");
          $(base).replaceWith(crd);
          app.cltime(i);
          console.log(ins0, ins);
          ctpclean();
        }
      }, app.qt);
    }
    return name;
  },
  cltime: function (ts) {
    try{
      clearInterval(ts);
    }catch (ex){
      clearTimeout(ts);
    }
    this.projtype = 0;
  },
  /**
   * @param {int} set description
   * @param {int} tid description
   * @param {text} name
   * @param {int} pos description
   * @return {null}
   */
  createTaskBar: function (tid, name, pos, set) {
    //TODO: Implement Me 
    var c = 0;
    var p = 0;
    var q = this.qb.slct('tid', 'taskbars', "tid = tid ORDER BY tid DESC LIMIT 1");
    this.qb.db.transaction(function (tx) {
      tx.executeSql(q, [], function (tx, rs) {
        c = rs.rows.item(0).tid;
      });
    }, function (err) {
      console.log(err);
    });
    var i = setInterval(function () {
      if (c == 0 || c == undefined)
        c = tid;
      if (set === 1)
        p = set;
      else
        p = UILoad.pid;
      if ((c !== undefined || c !== 0)) {
        var ins = this.qb.insert("taskbars",
                ['tid', 'pid', 'tname', 'pos'],
                [c, p, '"' + name + '"', pos]);
        app.qb.transaction(ins);
        app.cltime(i);
        console.log(ins);
      }

    }, app.qt);
    return name;
  },
  /**
   * @param  {} name 
   * @param  {} spl 
   * @param  {} parent 
   * @param  {} c 
   * @return {null}
   */
  createCard: function (name, spl, parent, c) {
    //TODO: Implement Me 
    var tid = $(parent).attr("id");
    var tidn = match(tid);
    this.qb.transaction(this.qb.insert('cards'
            , ['cname', 'tid', 'cdesc', 'assign', 'pid']
            , ['"' + name + '"', '"' + (tidn+1) + '"', '""',localStorage.usr, UILoad.pid]));
    var l =  UILoad.pid+ '_' + tidn + '_' + c;
    var newchild = UILoad.cardTemplate(l, name);
    $(parent).append(newchild);
    console.log("ceateC", parent);
    app.cards["ts_" + l] = c;

//       console.log(this.qb.insert('cards'
//      ,['cname','tid','cdesc','assign','pid']
//      ,['"'+name+'"','"'+tid+'"','""','0',1]));
//      app.qb.transaction(app.qb.update('cards'
//      ,['cname','tid','cdesc','assign']
//      ,['"'+name+'"','"'+tid+'"','"Nothing to show"','0'])); 
  },
  /**
   * @param id {} 
   * @param col {} 
   * @param value {} 
   * @return {null}
   */
  editProj: function (id, col, value) {
    //TODO: Implement Me 

  },
  /**
   * @param id {} 
   * @param Col {} 
   * @param Value {} 
   * @return {null}
   */
  editCard: function (id, Col, Value) {
    //TODO: Implement Me 
    app.qb.transaction(app.qb.update('cards'
            , Col + " = '" + Value + "'"
            , 'cid', '"' + id + '"'));
  },
  list: function () {
    var q = app.qb.slct(['pid as c', 'pname as nm', 'pdesc as d'], 'proj',
            'author_id = ' + localStorage.usr + ' AND status = "a" ORDER by pid DESC limit 10');
    var q0 = app.qb.slct(['pid as c', 'pname as nm', 'pdesc as d'], 'proj',
            'author_id = ' + 0 + ' AND status = "a" ORDER by pid DESC limit 10');
    app.q = q;
    setTimeout(function () { console.log("list bgan");
    //SELECT tname,proj.pid,pos from taskbars, proj, templates where taskbars.pid = templates.t_pid and templates.pid = proj.pid
    app.qb.db.transaction(function (tx) {
      tx.executeSql(q, [], function (tx, rs) {
        app.lst = rs.rows;
        console.log("started");
      if (app.lst === undefined) {
        console.log("nothing found");
      } else {
        console.log("test", rs.rows.length);
        for (var a = 0; a < app.lst.length; a++) {
          var base = document.createElement("div");
          console.log("#tid_0_p1");
          $(base).appendTo('#tid_0_p1');
          var crd = UILoad.projCard(app.lst.item(a).c, app.lst.item(a).nm);
          $(base).replaceWith(crd);
          //console.log(q, crd, "list");
          $(".modal").modal('hide');
        }
      }
      });
      tx.executeSql(q0, [], function (tx, rs) {
        app.lst = rs.rows;
        console.log("started");
      if (app.lst === undefined||app.lst.length === 0) {
        console.log("p0>nothing found");
      } else {
        console.log("test", rs.rows.length);
        for (var a = 0; a < app.lst.length; a++) {
          var base = document.createElement("div");
          console.log("#tid_0_p0");
          $(base).appendTo('#tid_0_p0');
          var crd = UILoad.projCard(app.lst.item(a).c, app.lst.item(a).nm);
          $(base).replaceWith(crd);
          //console.log(q, crd, "list");
          //clearTimeout(i);
        }
      }
      });
    }, function (err) {
      console.log(err, "large Error");
    });
    
      

    }, app.qt);
  },
  read: function () {
    //TODO: Implement Me
    viewToggle();
    UILoad.placeCards();
  },
  /**
   * @param tp {} 
   * @param id {} 
   * @param  {integer} 
   * @return {null}
   */
  delete: function (tp, id) {
    //TODO: Implement Me 
    if (id === undefined)
      id = UILoad.pid;
    if (tp === 'pid'){
      $.post("php/data_rm.php",{submit:1,all:id},function(rx){
        app.qb.db.transaction(function (tx){
          tx.executeSql("DELETE FROM proj WHERE pid = "+id);
          //tx.executeSql("delete from taskbars");
          tx.executeSql("DELETE FROM templates WHERE pid = "+id);
          tx.executeSql("DELETE FROM cards WHERE pid = "+id);
          setTimeout(function (){location.reload();},app.qt*2);
        });
        console.log(rx.msg);
      },"JSON");
      localStorage.setItem("pid", 0);
      localStorage.setItem("c", 0);
      localStorage.setItem("ct", 0);
      localStorage.setItem("Sync", 1);
      
    }else if (tp === 'ts')
    {
      $.post("php/data_rm.php",{submit:2,cid:id},function(rx){
        app.qb.db.transaction(function (tx){
          tx.executeSql("DELETE FROM  cards WHERE cid = "+id);
        });
        alert(rx.msg);
      },"JSON");
    }
    
  }
};