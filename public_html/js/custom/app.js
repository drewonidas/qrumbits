/**
* Generated On: 2017-1-17
* Class: app
* Description: This class/object will manage create, read, edit and  delete
*/

var app  = {
      colNames:[],
      cardCount:0,
       cards: {},
       qb: Q_ueryBuild,
       app : function(){
         //Constructor
         this.qb.init();
         if(UILoad.pid === '1'){
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
           },220);
           
           
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
       var name = prompt("Project Name", 'please enter the project name');
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
    createCard : function(name){
       //TODO: Implement Me 

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