

CREATE TABLE IF NOT EXISTS proj (
   pid integer NOT NULL,
   pname varchar(30) NOT NULL,
   date_created date ,
   date_modified date ,
   pstatus char ,
   author_id integer ,
   PRIMARY KEY (pid)
);




CREATE TABLE IF NOT EXISTS cards (
   cid integer NOT NULL,
   cname varchar(20) NOT NULL,
   tid integer NOT NULL,
   cdesc varchar(330) NOT NULL,
   assign integer NOT NULL,
   PRIMARY KEY (cid)
);


CREATE TABLE IF NOT EXISTS people (
   uid integer NOT NULL,
   uname varchar(20) NOT NULL UNIQUE,
   uemail varchar(72) NOT NULL UNIQUE,
   upassword varchar(100) NOT NULL,
   PRIMARY KEY (uid)
);



CREATE TABLE IF NOT EXISTS projectstatus (
   id smallint NOT NULL,
   chr char(0) NOT NULL UNIQUE,
   sname varchar(10) NOT NULL UNIQUE,
   descr varchar(200) NOT NULL,
   PRIMARY KEY (id)
);



