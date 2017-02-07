/**
* Generated On: 2017-1-17
* Class: UILoad
* placecards must run after app.app()
*/

var UILoad = {
   //Constructor
   pid:'',
   prj:{},
   tsb:{},
   crds:{},
   /**
   * @param id {int} 
   * @param size{int} size of col 2 - 4
   * @param  pid{int} 
   * @return {null}
   */
   placeTaskBar : function(obj,pid,pos,size){
       //TODO: build 
       var func = '';
       if (size === undefined) size = 3;
       if (pid === 0) func ="app.createProj()";else{func = 'cc(this)';}
       var tsbr = '<div class="container-fluid col-sm-'+size+'  col-xs-offset-1 well " id="tid_'+
               pid+'_'+obj.item(pos).tid+'" ondrop="drop(event)" ondragover="allowDrop(event)">\
            <div class="row" contenteditable="false" ondrop="preventDrop(event)" id="tt">\
              <h4 class="col-sm-5 text-center chead" >#'+obj.item(pos).nm+'</h4>\
              <a class="col-sm-2 col-sm-offset-5 btn well well-sm " onclick="'+func+'">+</a>\
            </div><!--/column header-->\
         </div>'
      return tsbr;
   },

   /**
   * @return {null}
   */
   placeCards : function(){
      //TODO: Implement Me 
      this.selectProject(this.pid);
      this.getProject(this.pid);
      setTimeout(function (){
         for (var a = 0; a < this.tsb.length;a++){
            var ts = UILoad.placeTaskBar(this.tsb,UILoad.pid,a);
            $("#proj").append(ts);
         }
         //console.log($("#proj").children().length,this.crds);
         for (var a = 0; a < this.crds.length; a++){
            var l = UILoad.pid + '_' + this.crds.item(a).tid + '_' +this.crds.item(a).cid;
            var base = document.createElement("div");
            //$('#tid_' + UILoad.pid + '_' + this.crds.item(a).tid).text = 'hh';
            $(base).appendTo('#tid_' + UILoad.pid + '_' + this.crds.item(a).tid);
            var crd = $(UILoad.cardTemplate(l,this.crds.item(a).nm));
            $(base).replaceWith(crd);
         }
         for (var a = 0 ; a < $("#proj").children().length;a++){//post
            app.colNames.push($($("#proj").children().get(a)).attr("id"));
         }
      },220);
   },
   
   /**
   * @param ID {} 
   * @return {null}
   */
   cardTemplate : function(l,cname){
       //TODO: Implement Me 
       //var l = spl[1] +'_'+ spl[2] +'_'+ c;
      var newchild = 
     '<div id="ts_'+ l
     +'" class="well container-fluid" ondrag="drag(event)" draggable="true">\
      <a  data-target="#'+ l
      +'" data-toggle="collapse" class="text-justify">'+cname+'</a>\
      <div id="'+ l +'" class="collapse" >\
         <label> description:</label>\
         <textarea id="ta_'+ l
      +'"style="width: 100%"></textarea>\
         <button onclick="$(this).parent().parent().hide()">delete</button>\
      </div>\
      <button class="btn pull-right" \
         onclick="adv(this)" title="Advance">>></button>\
      </div>';
      return newchild;
   },


   /**
   * @param ID {} 
   * @return {null}
   */
   selectProject : function(ID){
       //TODO: Implement Me
       var q = app.qb.slct(['pname as nm','status'],"proj","pid = '"+
               ID + "'");
       
       app.qb.db.transaction(function (tx){
          tx.executeSql(q,[],function (tx,rs){
             //console.log(tx.rs);
             this.prj = rs.rows;
          });
       },function (err){ console.log(err);});
   },


   /**
   * @param ID {} 
   * @return {null}
   */
   getProject : function(ID){
       //TODO: Implement Me
      var q = app.qb.slct(["tid",'tname as nm','pos'],"taskbars","pid = '"+
               ID + "'");
      var q0 = app.qb.slct(["cid",'cname as nm','tid'],"cards","pid = '"+
               ID + "'");
       //console.log(q);
       //console.log(q);
       app.qb.db.transaction(function (tx){
         tx.executeSql(q,[],function (tx,rs){
             //console.log(rs);
            this.tsb = rs.rows;
         });
         tx.executeSql(q0,[],function (tx,rs){
           //console.log(rs);
            this.crds = rs.rows;
         });//then add the cardsl
       },function (err){ console.log(err);});
   }


  


}