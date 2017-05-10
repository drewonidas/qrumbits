/**
 * @description Created on : 18-04-2017
 * app UILoad Q_ueryBuild implemented to Suppress Errors Dev-Time
 * */
var app= app||{};
var Q_ueryBuild= Q_ueryBuild||{};
var UILoad= UILoad||{};
var DBConnect= DBConnect||{};
var lg = false;
var qb = app.qb;
var db = qb.db;
var co = 2;
var res = "";
var usr = localStorage.getItem('usr') || 0;
var c = localStorage.getItem('c') || 0;
var ct = localStorage.getItem('ct') || 1;
var Sync = localStorage.getItem('Sync') || 1;
localStorage.setItem('Sync',Sync);
var trs = [0, 0, 0];
$('[data-toggle="tooltip"]').tooltip();
UILoad.pid = localStorage.getItem('pid') || 0;
function sign_in() {
  var t = $('#signemail');
  if (t.val().trim() === "") {//changed from == to ===
    message("cant be empty", $('#signemail'));
  } else {
    lg = true;
    v_email();
  }
}

if (window.hasOwnProperty('openDatabase')) {

  //resolver()
  var ndif1 = false, ndif2 = false, ndifdata = {}, loader = [];

  function resolver() {
    $('.modal').modal('hide');
    if (ndifdata !== {}) {
      DBConnect.getdata('cards', 'cid  =  cid');
      for (var x = 0; x < ndifdata['r']['proj'].length; x++) {
        ndifdata['dat'] = ndifdata['r']['proj'][x];
        DBConnect.datawr(ndifdata, loader['pid'], 'pid', 'proj');
      }
      $("#loading").modal("show");
      var m = setInterval(function () {//safer
        if (DBConnect.fetch > 0){
          DBConnect.fetch--;
        }
        else
        {
          var a =  new CustomEvent('CompletedFetch',{detail:DBConnect.fetch});
          window.dispatchEvent(a);
          $("#loading").modal("hide");
          app.cltime(m);
        }
      }, app.qt/2);
    }
  }
  function overwrite() {

    //app.delete();
    $('.modal').modal('hide');
    if (ndifdata !== {}) {
      DBConnect.getdata('cards', 'cid  =  cid');
      for (var x = 0; x < ndifdata['r']['proj'].length; x++) {
        ndifdata['dat'] = ndifdata['r']['proj'][x];
        
        //console.log(ndifdata['dat']);
        //ndifdata['org'][0] = proj;
        DBConnect.datawr(ndifdata, 0, 'pid', 'proj');
        DBConnect.fetch =4;
      }
      $("#loading").modal("show");
      var m = setInterval(function () {//safer
        if (DBConnect.fetch > 0){
          
          //console.log(DBConnect.fetch);
          DBConnect.fetch--;
        }
        else
        {
          var a =  new CustomEvent('CompletedFetch',{detail:DBConnect.fetch});
          window.dispatchEvent(a);
          app.cltime(m);
        }
      }, app.qt/4);
    }
  }
  function reloader(e) {
    localStorage.setItem('Sync', e.detail);
    app.list();
    
  }

  function finaliser(e) {
    //log caught
    window.addEventListener("CompletedFetch",reloader);
    console.log(e.detail, ndif1, ndif2);
    if (ndif1 & ndif2) {
      DBConnect.token = (DBConnect.token.length === 0)?projs:DBConnect.token;
      //DBConnect.token.push();
      if (parseInt(localStorage.getItem('Sync'))===1)
      setTimeout(function () {
        var ndiff = DBConnect.ndiff(DBConnect.token, ndifdata['dat'], 'pname', 'pdesc');
        if (!ndiff) {
          window.removeEventListener('ndiff',finaliser);
          $('#consync').modal('show');
        }
        ndif1 = ndif2 = false;
      }, app.qt);
    }
  }

  function syncd() {
    //catch thrown
    window.addEventListener('ndiff', finaliser);
    var p = [];
    var q = this.qb.slct('pid', 'proj', "pid = pid ORDER BY pid ASC");
    try {
      this.qb.db.transaction(function (tx) {
        tx.executeSql(q, [], function (tx, rs) {
          if (rs.rows.length > 0)
            for (var x = 0; x < rs.rows.length; x++)
              p.push(rs.rows.item(x));
          loader = p;
          //if (rs.rows.length > 0)
          var dif = new CustomEvent('ndiff', {detail: (rs.rows.length > 0) ? p[DBConnect.shift - 1].pid : 0});
          DBConnect.getdata('proj', 'pid =' + ((rs.rows.length > 0) ? p[DBConnect.shift - 1].pid : 0));
          ndif1 = true;
          setTimeout(function () {
            window.dispatchEvent(dif);//thrower
          }, app.qt);
        });
      }, function (err) {
        console.log(err);
      });
    } catch (ex) {
      console.error(ex);
    }
    $.post('php/newmoduletest.php', {}, function (resp) {
      if (resp !== undefined) {
        var r;
        if ((r = JSON.parse(resp))) {

          //DBConnect.syncD(r);
          var dif = new CustomEvent('ndiff', {detail: r['proj'].length});
          ndif2 = true;
          ndifdata['r'] = r;
          //if (r['proj'][0]!==undefined)
          ndifdata['dat'] = r['proj'][0];
          setTimeout(function () {
            window.dispatchEvent(dif);//thrower
          }, app.qt);
        }
      }
    }, 'TEXT');
  }
  //--/resolver

  function message(msg, t) {
    //alert(msg);
    t = $(t);
    //$('[data-toggle="tooltip"]').tooltip();
    t.tooltip("destroy");
    t.prop("title", msg);
    t.tooltip("show");
    //}else{
    //alert(msg);
    //}
  }
  function v_email() {//testemail
    var email1 =
            $('#signemail').val().toLowerCase();//input box value
    var pass = $("#signpass").val();
    var tst = /.+[@].+[\.].+/; //create regex CREATE TABLE people ( uid INTEGER NOT NULL , uname VARCHAR(20) NOT NULL, uemail VARCHAR(72) NOT NULL, upassword VARCHAR(100), PRIMARY KEY (uid) )
    if (tst.test(email1))
    {
      $.post("php/data_verify.php",
              {email: email1, password: pass}, function (response) {
        if (response.userstatus === 1) {
          localStorage.setItem('usr', response.c);
          UILoad.pid = localStorage.pid;
          localStorage.setItem('rl', response.rl);
          qb.transaction(qb.insert('people', 
          ['uid', 'uemail', 'role'], 
          [response.c, email1, response.rl]));
          loda();
          $("#nm").text(response.name.toUpperCase());
          app.app();
          localStorage.setItem("count", 0);
        } else if (response.userstatus === -1) {
          if (localStorage.count == 1)
            rg(email1);
          else
            message("Please Check Your Email or Click on < Sign in or Register > to proceed to registration",$('#signemail'));
          localStorage.setItem("count", 1);
        } else {
          if (localStorage.count === undefined ||
                  parseInt(localStorage.getItem("count")) < 3) {
            message('invalid password', $('#signpass'));
            localStorage.setItem("count",
                    parseInt(localStorage.getItem("count")) + 1 || 0);
          } else
            message('email sent to reset password', $('#signpass'));
        }
      }
      , 'JSON');//AJAX post (JQUERY Function)
    } else if (!tst.test(email1)) {
      message('invalid email', $('#signemail'));
    } else {

    }
  }
  function verify() {//password test
    var tgt = $("#signpass");
    var tgt1 = $("#pass").val();
    var tgt2 = $("#conpass").val();
    var pwd = tgt.val();
    var tst = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\u0020-\u002F|\u003A-\u0040|\u005B-\u0060|\u007B-\u007E])/;
    if (tst.test(pwd)) {
      if (trs[0] === 0)
        $("#signpass").tooltip("destroy");
      trs[0] = 1;
    } else if (pwd.length < 8)
      message("Password too short", $("#signpass"));
    if (tgt1.length < 8) {
      message("weak password", $("#pass"));
      //$()
    } else if (tst.test(tgt1)) {
      if (trs[1] === 0)
        $("#pass").tooltip("destroy");
      trs[1] = 1;
    } else if (!tst.test(tgt1)) {
      trs[1] = 0;
    }
    if (tgt1 == tgt2 && trs[1] == 1) {
      if (trs[2] === 0)
        $("#conpass").tooltip("destroy");
      trs[2] = 1;
      console.log("passmatch");
      message("Okay", $("#conpass"));
    } else {
      message("Password does match", $("#conpass"));
      trs[2] = 0;
    }
    if (trs[2] === 1)
      $("#reg").prop("disabled", false);
  }
  function rg(email1) {
    var targ = $("#rg");
    targ.removeClass("hidden");
    $("#email").val(email1);
    var test = /@.+/;
    $('#username').val(email1.replace(test, ""));
    $("#lg").addClass("hidden");
    message("Message : email is not registered " +
            "please fill the information below", targ);
  }
  function sendR() {//register call
    var eml = $("#email").val().trim();
    var usrn = $("#username").val().trim();
    var pswd = $("#pass").val().trim();
    var rl = $("#rrole").val().trim();
    $.post("php/data_verify.php"
            , {email: eml, pwd: pswd, role: rl, username: usrn},
            function (respo) {
              var resp = JSON.parse(respo);
              console.log(resp);
              if (resp.userstatus === 1) {//needs improving
                console.log("attempt to load");
                localStorage.setItem("usr", resp.c);
                localStorage.setItem("pid", 0);
                localStorage.setItem('rl', resp.rl);
                loda();
                $("#nm").text(resp.name.toUpperCase());
                app.app();
              } else {
                console.log(resp);
                if (resp.userstatus === 0 && resp.c > 0)
                  window.location = '.';
              }
            }
    , "TEXT");
  }

  $(document).ready(function () {
    qb.init();
    $.post("php/newmoduletest.php",{er:1},function(resp){
          //console.log(resp['taskstatusbars']);
          db.transaction(function (tx) {
          if (resp.hasOwnProperty('taskstatusbars')){
            for (var xx in resp['taskstatusbars']){
              var r = resp['taskstatusbars'][xx];
                tx.executeSql(qb.insert("taskbars",
                        ['tid', 'pid', 'tname', 'pos'],
                        [r['tid'], r['pid'], '"' + r['tname'] + '"',r['pos']]));
                        
              
            }
            c = resp['taskstatusbars'].length || 0;
          }
          }, function (err) {
                console.log(err);
              });
        },'JSON');
    db.transaction(function (tx) {
      var qry = qb.slct('count(*) as c', 'taskbars');
      var q2 = "SELECT distinct pid,tname FROM taskbars GROUP BY pid ORDER BY pid DESC";
      tx.executeSql(qry, [], function (tx, rs) {
        if (rs.rows.length > 0)
          c = rs.rows.item(0).c;
        else
          c = 0;
        localStorage.setItem('c', c);
        if (c === 0) {
          db.transaction(function (tx) {
            tx.executeSql(qb.insert("taskbars",
                    ['tid', 'pid', 'tname', 'pos'],
                    [1, 1, '"' + 'todo' + '"', 0]));
            tx.executeSql(qb.insert("taskbars",
                    ['tid', 'pid', 'tname', 'pos'],
                    [2, 1, '"' + 'in-progress' + '"', 1]));
            tx.executeSql(qb.insert("taskbars",
                    ['tid', 'pid', 'tname', 'pos'],
                    [3, 1, '"' + 'done' + '"', 2]));
            c = 3;
            localStorage.c = c;
          }, function (err) {
            console.log(err);
          });
        }
      });
      tx.executeSql(q2, [], function (tx, rs) {
        if (rs.rows.length > 0)
          ct = rs.rows.item(0).pid + 1;
        else
          ct = 1;
        localStorage.setItem('ct', ct);
        DBConnect.shift = (ct - 1);
        if (rs.rows.length > 1){
          console.log('addTempl',rs.rows.item(0).pid ,rs.rows.item(0).tname);
          for (var x= 2; x <= rs.rows.length; x++){
            $('#tmladd').append(
                    '<div class="form-group">'
                    +'<button class="btn btn-success form-control" onclick="create('
                    + (x) + ')"> Template '+ (x-1) +'</button></div>');
          }
        }
        }, function (err) {
          console.log(err);
      });
    }, function (err) {
      console.log(err);
    });
    $("#lvl").click(function () {
      if (UILoad.pid > 0) {
        
        localStorage.setItem("pid", 0);
        if (parseInt(localStorage.getItem('Sync')) === -1)
          DBConnect.connect();
        else
          location.reload();
      } else
        lg0();
      //setTimeout(function(){location.reload(true);},app.qt*5);
    });

    $.post("php/get_data.php",
            {1: '1'},
            function (resp) {
              if (resp.hasOwnProperty('c') && resp.c !== null) {
                if (resp.userstatus === 1)
                  localStorage.setItem('usr', resp.c);
                if (usr > 0) {
                  //localStorage.pid = 0;//reset to landing
                  console.log("Setting Up", localStorage);
                  localStorage.setItem('rl', resp.rl);
                  loda();
                  $("#nm").text(resp.name.toUpperCase());
                  setTimeout(function () {
                    app.app();
                  }, app.qt);
                }
              } else {
                localStorage.setItem("usr", 0);
              }
            }
    , "JSON");
  });//setup


  function projSelected(ts) {
    //alert('proj id='+($(ts).attr('id').split('_')[1] -1));
    UILoad.pid = ($(ts).attr('id').split('_')[1]);
    localStorage.setItem("pid", UILoad.pid);
    viewToggle();
    app.app();
  }
  function del(th){
    //console.log($(th).parent().parent().prop('id'));
    var xx = $(th).parent().parent().attr('id').split('_');
    var sp = xx[xx.length-1];
    var tp = xx[0];
    app.delete(tp,sp);
    $(th).parent().parent().remove();
    //console.log(tp,sp);
  }
  function viewToggle() {
    if (UILoad.pid === 0) {//might cause errors
      $('#proj').hide();
      $('#landing').show();
      $("title").text("Landing");
      $('#smenu').removeClass("hidden");
      //console.log("land view");
    } else {
      $('#proj').show();
      $('#landing').hide();
      $("title").text("Project");
      $('#smenu').addClass("hidden");
      $('#srch').addClass('hidden');
      //console.log("proj view");
    }

  }

  function loda() {
    UILoad.pid = localStorage.pid;
    usr = localStorage.usr;
    $("#Login").remove();
    if (localStorage.getItem('rl') === 'm')
      $('#role').append($('<option>', {
        value: 'm',
        text: 'Manager'
      }));
    $("#landing").removeClass('hidden');
    $("title").text("Landing");
    $("#ct_3t").hide();
    $("#ct_4t").hide();
    $("#ct_5t").hide();
    $("#nvb").removeClass('hidden');
    syncd();
  }

  function proj() {
    if ($('#role').val() === 't')
      $('#mnu').modal('show');
    if ($('#role').val() === 'm')
      $('#ctemp').modal('show');
  }
  function create(typ) {
    var name;
    setTimeout(function () {
      if ((name = prompt("Project Name", "please enter Projects name"))) {
        app.projtype = ((typ===undefined)?1:typ) ;
        app.createProj(name, usr, 1);
        setTimeout(function () {
          app.read();
        }, app.qt);
      }
    }, app.qt);
  }

  function ctp() {
    $('.modal').modal("hide");
    $('#tml').modal("show");
  }

  function ctpr(th)//create Template
  {

    if ($('#ctn').val().trim()===""||$('#ct_1').val().trim()===""
            ||$('#ct_2').val().trim()===""){
      message("all fields must not be empty", th);
      return;//stop execution;
    }
    app.createProj("name",0,0);
    //return name;
  }
  function ctpclean(){
    window.co = 2;
    $('#ctn').val("");
    for (var x = 1;x <= 5; x++){
      $('#ct_'+x).val("");
    }
    $("#ct_3t").hide();
    $("#ct_4t").hide();
    $("#ct_5t").hide();
    window.ct =  localStorage.ct;
  }

  function atsb(th)
  {
    switch (co)
    {
      case 5:
        message('max allowed', th);
        break;
      case 4:
        $('#ct_5t').show();
        co++;
        break;
      case 3:
        $('#ct_4t').show();
        co++;
        break;
      case 2:
        $('#ct_3t').show();
        co++;
        break;
      default :
        message('Fatal Error', th);
    }

  }

  function cc(which) {
    var crd = 0;
    var q = qb.slct("cid as c", 'cards',
            "cid  = cid order by cid desc limit 1");

    db.transaction(function (tx) {
      tx.executeSql(q, [], function (tx, rs) {
        try {
          if (rs.rows.length > 0)
            crd = rs.rows.item(0).c + 1;
          else
            crd = 1;
          var parent = ($(which).parent().parent());
          //console.log(parent.prop('id'));
          var name;
          if ((name = prompt("Create New Task"))) {
            var l;
            app.createCard(name, l, parent, crd);
            localStorage.setItem('Sync',-1);
          }
        } catch (ex) {
          console.log(ex);
          alert("Catastrophic Error Reloading");
          window.location = ".";
        }
      });
    }, function (err) {
      console.log(err);
    });
    setTimeout(function () {
    }, app.qt);//needs testing // working *i3 4th gen chrome 1.7ghz
  }
  function typ(ths) {
    //console.log($(ths).val());
    app.editCard($(ths).attr('id').toString().split('_')[3],
            'cdesc', $(ths).val());
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }
  function preventDrop(ev) {
    ev.preventDefault();
  }
  function drag(ev) {
    //console.log(ev.target.id);
    co = ev.srcElement.id;
    //console.log(co);
  }
  function drop(ev) {
    ev.preventDefault();

    //console.log(app.cards);
    if (match(ev.srcElement.id)) {
      $(ev.target).append($('#' + co));
      qb.transaction(qb.update('cards'
              , "tid = '" + (match(ev.srcElement.id) + 1) + "'"
              , 'cid', '"' + co.split('_')[3] + '"'));
//      console.log(qb.update('cards'
//              , "tid = '" + (match(ev.srcElement.id) + 1)+ "'"
//              , 'cid', '"' + co.split('_')[3] + '"'));
      setTimeout(function () {
        localStorage.setItem("Sync",-1);
      }, app.qt);//needs testing // working *i3 4th gen chrome 1.7ghz
    }
  }
  function gtid(ths) {//get parent
    var parent = ($(ths).parent());
    var counter = 0;
    while (!match(parent.attr('id'))){
      parent = parent.parent();
      counter++;
      if (counter > 6)break;
    }
    if (counter > 6)console.log("Tid Not Found");
    var tid = $(parent).attr("id");
    //console.log(tid);
    var spl = tid.split("_");
    return (spl);
  }
  function adv(ths) {
    //var spl = gtid(ths);
    var tar = ($(ths).parent().parent().attr('id'));
    console.log(match(tar),tar,window.app.colNames);
    
    var txt =  app.colNames[(match(tar) + 1)%app.colNames.length];
    $('#' + txt).append($('#'+$(ths).parent().attr('id')));
    var pnt = match(txt);
//    console.log("advs",txt, app.colNames[spl[2]], $(ths).parent().attr('id').toString().split('_')[3]);
    app.editCard($(ths).parent().attr('id').split('_')[3],
            'tid', ((pnt % app.colNames.length) + 1));//app.editCard
    
    setTimeout(function () {
      //$('#'+$(ths).parent().attr('id')).remove();
      localStorage.setItem("Sync",-1);
    }, app.qt);//needs testing // working *i3 4th gen chrome 1.7ghz
    
  }
  function match(pnt) {
    for (var a = 0; a < app.colNames.length; a++)
      if (pnt === app.colNames[a])
        return a;
    return false;
  }
  function pid0() {
    //console.log('pid0');

    //window.location = '.';
    // console.log('done');
  }
  function lg0() {
    //pid0();
    UILoad.tsb = null;
    //app.delete();//wait ntil sync implementation the implement this
    $.post("php/logout.php", {}, function () {}, "HTML");
    location.reload();
  }
  function beautifier(){
    console.log($("#proj").children().first().attr('id'));
    //$("#proj").children().first().addClass('');
    //$("#proj:nth-child(2)").prop('id');
  }
  function lSearch(){
    var src = $('#srch').val();
    var qry =  qb.slct("DISTINCT pid,pname","proj","pname LIKE '%"+ src +"%' OR pDesc LIKE '%" + src +"%'");
    if (src.length >= 2){
      db.transaction(function (tx){console.log(src,src.length);
        tx.executeSql(qry,[],function (tx,rx){
          $('#smenu').removeClass("hidden");
          $('#smenu').empty();
          console.log(src);
          if (rx.rows.length > 0)
              for(var xx = 0; xx <rx.rows.length;xx++)
                $('#smenu').append("<li id='pid_"+ rx.rows.item(xx).pid
                    +"' class='btn btn-success ' onclick='projSelected(this)'>"+
                     rx.rows.item(xx).pname+"</li>");

        });
      });
    }else{
      $('#smenu').addClass("hidden");
      $('#smenu').empty();
    }
  }
} else {
  if (!window.hasOwnProperty('openDatabase'))
    $('#proj').append("<h1 class='jumbotron'>SO SAD! You Need Safari or \
                                  Google Chome \
                               or Opera Or Chromium web Browser </h1>");
}