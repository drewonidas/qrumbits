CREATE TABLE proj (
   pid integer NOT NULL,
   pname varchar(30) NOT NULL,
   date_created date NOT NULL,
   date_modified date NOT NULL,
   status char NOT NULL,
   author_id integer NOT NULL,
   PRIMARY KEY (pid)
);

CREATE TABLE taskbars (
   tid integer NOT NULL,
   tname varchar(20) NOT NULL,
   pid integer NOT NULL,
   pos integer NOT NULL,
   PRIMARY KEY (tid)
);

CREATE TABLE cards (
   cid integer NOT NULL,
   cname varchar(20) NOT NULL,
   tid not defined NOT NULL,
   cdesc varchar(330) NOT NULL,
   assign integer NOT NULL,
   PRIMARY KEY (cid)
);


CREATE TABLE people (
   uid integer NOT NULL,
   uname varchar(20) NOT NULL,
   uemail varchar(72) NOT NULL,
   upassword varchar(100) NOT NULL,
   PRIMARY KEY (uid)
);

