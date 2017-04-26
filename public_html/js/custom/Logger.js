/**
* Generated On: 2017-1-17
* Class: Logger
*/

var Logger = {
    //Constructor

    type: null,
    message: null,
    datetime: null,
    priority:null,
    /**
     * @param type {}
     * @param msg {}
     * @return {null}
     */
    log: function(type, msg){
        //TODO: Implement Me

    },
    logE: function (e){
      console.log(JSON.stringify(e.detail));
    }
};
