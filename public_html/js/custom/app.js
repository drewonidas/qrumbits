/**
* Generated On: 2017-1-17
* Class: app
* Description: This class/object will manage create, read, edit and  delete
*/

var app  = {
      colNames:[],
      cardCount:0,
      /**
       * @description query time
       * */
      qt:220,//220 optimum
      projtype:0,
       cards: {},
       qb: Q_ueryBuild,
       app : function(){
         //Constructor
         this.qb.init();
         UILoad.pid = localStorage.getItem("pid") || 0;
      if (UILoad.pid >= 1) {
         
           app.read();
         }else{
           console.log("proj land")
           var pr = {};
           this.qb.db.transaction(function (tx){
              tx.executeSql(qb.slct(['pid as tip','pid','pname as nm'],'proj')
              ,[],function (tx,rs){
                 pr = rs.rows;
              });
           },function (er){console.log(er);});
           setTimeout(function (){
              var obj = {
                 item:function(i){ if(i===0)return{tid:'p0',nm:'Active Projects'};
                    return{tid:'p1',nm:'My Projects'};}
              };
              //console.log(obj.item(0).nm);
              for(var a = 0;a <= obj.length;a++)
                 console.log(obj.item(a).nm);
              $('#landing').append(UILoad.placeTaskBar(obj,0,0,4));
              $('#landing').append(UILoad.placeTaskBar(obj,0,1,4));
              app.list();
           },app.qt);
        }
     },


   /**
   * @documentation: Creates a Project Entry
   *    
   *@param {string} name description
   * @return {null}
   */
   createProj :function(name,usr,prty){
      //TODO: Implement Me 
      $("#mnu").modal('hide');
      var c = 0;
      var q = this.qb.slct('pid','proj',"pid = pid ORDER BY pid DESC LIMIT 1");
      this.qb.db.transaction(function(tx){
               tx.executeSql(q,[],function(tx,rs){
                  c = rs.rows.item(0).pid + 1;
               });
            },function(err){console.log(err);});
      var i = setInterval(function (){
         if (c == 0|| c == undefined)
            c = 1;
         if((c !== undefined || c !== 0)){
            var ins = this.qb.insert("proj",
            ['pid','pname','date_created','date_modified','status','author_id'],
            [c,'"'+name+'"','date()','date()','"a"','"'+usr+'"']);
            var ins0 = this.qb.insert("templates",
            ['t_pid','pid'],[prty,c]);
            app.qb.transaction(ins);
            app.qb.transaction(ins0);
            
            UILoad.pid = c;
            localStorage.setItem("pid",UILoad.pid);
            if ((UILoad.pid == 0)){$('#proj').hide();$('#landing').show();}
            else{$('#proj').show();$('#landing').hide();}
            //app.app();
            app.cltime(i);console.log(ins0,ins);
         }
         
      },app.qt);
      return name;
   },
   cltime:function (ts){
      clearInterval(ts);
      this.projtype = 0;
   },

   /**
    * @param {int} pid description
    * @param {int} tid description
    * @param {text} name
    * @param {int} pos description
    * @return {null}
   */
    createTaskBar  : function(tid,name,pos,set){
      //TODO: Implement Me 
      var c = 0;
      var p = 0;
      var q = this.qb.slct('tid','taskbars',"tid = tid ORDER BY tid DESC LIMIT 1");
      this.qb.db.transaction(function(tx){
               tx.executeSql(q,[],function(tx,rs){
                  c = rs.rows.item(0).tid;
               });
            },function(err){console.log(err);});
      var i = setInterval(function (){
         if (c == 0|| c == undefined)
            c = tid;
         if (set === 1)
            p = set;
         else
            p = UILoad.pid;
         if((c !== undefined || c !== 0)){
            var ins = this.qb.insert("taskbars",
            ['tid','pid','tname','pos'],
            [c,p,'"'+name+'"',pos]);
            app.qb.transaction(ins);
            app.cltime(i);console.log(ins);
         }
         
      },app.qt);
      return name;
   },


   /**
   * @param  {}name 
   * @return {null}
   */
    createCard : function(name,spl,parent,c){
      //TODO: Implement Me 
      var tid = $(parent).attr("id");
      tid = tid.split('_')[2];
      this.qb.transaction(this.qb.insert('cards'
      ,['cname','tid','cdesc','assign','pid']
      ,['"'+name+'"','"'+tid+'"','""','0',spl[1]]));
       var l = spl[1] +'_'+ spl[2] +'_'+ c;
      var newchild = UILoad.cardTemplate(l,name);
      $(parent).append(newchild);
      app.cards["ts_"+ l] = c;

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
    editProj  : function(id, col, value){
       //TODO: Implement Me 
       
   },


   /**
   * @param id {} 
   * @param Col {} 
   * @param Value {} 
   * @return {null}
   */
    editCard  : function(id, Col, Value){
       //TODO: Implement Me 
      this.qb.transaction(this.qb.update('cards'
               ,Col +" = '" + Value +"'" 
               ,'cid', '"' + id+'"'));
   },
   
   list:function(){
      var q = app.qb.slct(['pid as c', 'pname as nm', 'pdesc as d'], 'proj',
              'author_id = 0 and status = "a" limit 20');
      //SELECT tname,proj.pid,pos from taskbars, proj, templates where taskbars.pid = templates.t_pid and templates.pid = proj.pid
      var lst = {};
      app.qb.db.transaction(
              function (tx){
                  tx.executeSql(q,[],
                  function(tx,rs){
                     lst = rs.rows; 
                  });
              },function (err){console.log(err);});
      setTimeout(
         function (){
            console.log(lst);
            for (var a = 0;a < lst.length;a++){
               var base = document.createElement("div");
               $(base).appendTo('#tid_0_p1');
               var crd = $(UILoad.projCard(lst[a].c,lst[a].nm));
               $(base).replaceWith(crd);
               console.log(q,crd);
            }
         },
              app.qt);
   },

   read  : function(){
       //TODO: Implement Me
       if ((UILoad.pid == 0)){$('#proj').hide();$('#landing').show();}
            else{$('#proj').show();$('#landing').hide();}
      UILoad.placeCards();
   },


   /**
   * @param type {} 
   * @param id {} 
   * @param  {integer} 
   * @return {null}
   */
    delete  : function(type, id){
       //TODO: Implement Me 
      qb.transaction("drop table proj");
      qb.transaction("drop table taskbars");
      qb.transaction("drop table templates");
      localStorage.setItem("pid",0);
   }
}