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
    UILoad.placeCards();
      
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