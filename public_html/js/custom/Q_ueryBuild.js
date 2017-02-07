/**
 * Generated On: 2017-1-17
 * Class: Q_ueryBuild
 */

var Q_ueryBuild = {
   //ConstructorQ_ueryBuild.prototype.db : null;
   db: openDatabase("CrDB", "1.0", "WebSql Implementition",
           4 * 1024 * 1024),
   transaction: function (q) {
      this.db.transaction(function (tx) {
         tx.executeSql(q);
      })
   }, /**
    * @param selection {} 
    * @param table {} 
    * @param lim {} 
    * @return qs{} query string
    */
   slct: function (selection, table, lim) {
      //TODO: Implement Me
      var qs = "SELECT ";
      qs += this.arrayJustify(selection);
      qs += " FROM ";
      qs += this.arrayJustify(table)
      if (lim !== undefined) {
         qs += " WHERE "
         qs += lim;
      }
      return qs;

   },
   /**
    * @param table {} UPDATE 'table
    * @param colepar {} SET 'col = 'par 
    *  
    * @param id {} where 'id
    * @param val {}  = 'val
    * @return qs 
    */
   update: function (table, colepar, id, val) {
      //TODO: Implement Me 
      var qs = "UPDATE "+ table +' SET ';
      qs += this.arrayJustify(colepar);
      qs += " WHERE "+ id + " = " + val;
      return qs;
   },
   /**
    * @return qs{null}
    */
   init: function () {
      //TODO: Implement Me 
      var tb0 = "CREATE TABLE proj (\
   pid INTEGER NOT NULL ,\
   pname varchar(30) NOT NULL,\
   date_created date NOT NULL,\
   date_modified date NOT NULL,\
   status CHAR NOT NULL,\
   author_id integer NOT NULL,\
   PRIMARY KEY (pid)\
);";
      var tb1 = "CREATE TABLE taskbars (\
   tid INTEGER NOT NULL ,\
   tname VARCHAR(20) NOT NULL,\
   pid INTEGER NOT NULL,\
   pos INTEGER NOT NULL,\
   PRIMARY KEY (tid)\
);";
      var tb2 = "CREATE TABLE cards (\
   cid INTEGER NOT NULL ,\
   cname VARCHAR(20) NOT NULL,\
   tid INTEGER NOT NULL,\
   cdesc VARCHAR(330),\
   pid INTEGER,\
   assign INTEGER,\
   PRIMARY KEY (cid)\
);";
      var tb3 = "CREATE TABLE people (\
   uid INTEGER NOT NULL ,\
   uname VARCHAR(20) NOT NULL,\
   uemail VARCHAR(72) NOT NULL,\
   upassword VARCHAR(100),\
   PRIMARY KEY (uid)\
);"//VARCHAR INTEGER CHAR DATE
     var trye = this.transaction(tb0);
     //console.log(trye);
      this.transaction(tb1);
      this.transaction(tb2);
      this.transaction(tb3);
   },
   /**
    * 
    * @return qs{null}
    */
   arrayJustify: function (obj) {
      //TODO: Implement Me 
      var qs = '';
      if (!obj.hasOwnProperty("substr")) {
         qs += obj;
      } else /*if (obj.hasOwnProperty("length")) */{
         if (obj[0] !== undefined)
            qs += obj[0];
         for (var a = 1; a < obj.length; a++) {
            qs += ", " + obj[a];
         }
      }
      return qs;
   },
   /**
    * @param tble {} 
    * @param cols {} 
    * @param vals {} 
    * @return qs{null}
    */
   insert: function (tble, cols, vals) {
      //TODO: Implement Me 
      var qs = "INSERT INTO ";
      qs += tble +"(";
      qs += this.arrayJustify(cols);
      qs += ") VALUES (";
      qs += this.arrayJustify(vals) + ")";
      return qs;

   }
}


