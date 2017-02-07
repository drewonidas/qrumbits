/**
* Generated On: 2017-1-17
* Class: app
* Description: This class/object will manage create, read, edit and  delete
*/

var app  = {
      colNames:[],
      cardCount:0,
      qt:220,
       cards: {},
       qb: Q_ueryBuild,
       app : function(){
         //Constructor
         this.qb.init();
         UILoad.pid = 1;
         if(UILoad.pid >= '1'){
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
           },app.qt);
        }
     },


   /**
   * @documentation: Creates a Project Entry
   *    
   *
   * @param name {} 
   * @return {null}
   */
   createProj :function(name){
       //TODO: Implement Me 
       name = prompt("Project Name", 'please enter the project name');
       return name;
   },


   /**
   * @param name {} 
   * @return {null}
   */
    createTaskBar  : function(name){
      //TODO: Implement Me 
      
   },


   /**
   * @param name {} 
   * @return {null}
   */
    createCard : function(name,spl,parent,c){
      //TODO: Implement Me 
      var tid = $(parent).attr("id");
      tid = tid.split('_')[2];
      this.qb.transaction(this.qb.insert('cards'
      ,['cname','tid','cdesc','assign','pid']
      ,['"'+name+'"','"'+tid+'"','""','0',1]));

       var l = spl[1] +'_'+ spl[2] +'_'+ c;
      var newchild = UILoad.cardTemplate(l,name);
      $(parent).append(newchild);
      app.cards["ts_"+ l] = c;

       console.log(this.qb.insert('cards'
      ,['cname','tid','cdesc','assign','pid']
      ,['"'+name+'"','"'+tid+'"','""','0',1]));
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


   /**
   * @param Projid {} 
   * @return {null}
   */
    read  : function(Projid){
       //TODO: Implement Me 
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

   }
}