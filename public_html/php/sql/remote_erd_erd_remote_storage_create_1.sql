-- THIS SQL SCRIPT IS UNIQUE TO MYSQL
CREATE DATABASE IF NOT EXISTS qrumb;

CREATE TABLE IF NOT EXISTS qrumb.project (
   pid integer NOT NULL AUTO_INCREMENT,
   pname varchar(30) NOT NULL,
   date_created date NOT NULL,
   date_modified date NOT NULL,
   status char,
   uid integer NOT NULL,
   pdesc varchar(200),
   date_expiring date NOT NULL,
   PRIMARY KEY (pid, uid)
);


-- COMMENT ON TABLE IF NOT EXISTS qrumb.project
  -- COMMENT 'Defines A Projects Name And Core Attributes
-- Dual Primary keys to make sure settings are unique to a user';
-- COMMENT ON COLUMN qrumb.project.pid
  -- COMMENT 'Project Identity Number,  Indexing Project in the Database .
-- ';
-- COMMENT ON COLUMN qrumb.project.pname
  -- COMMENT 'Projects Canonical Name';
-- COMMENT ON COLUMN qrumb.project.date_created
  -- COMMENT 'date created';
-- COMMENT ON COLUMN qrumb.project.date_modified
  -- COMMENT 'date of last activity';
-- COMMENT ON COLUMN qrumb.project.status
  -- COMMENT 'Project  Status.';
-- COMMENT ON COLUMN qrumb.project.uid
  -- COMMENT 'author id or employee number';
-- COMMENT ON COLUMN qrumb.project.pdesc
  -- COMMENT 'Projects Description';
-- COMMENT ON COLUMN qrumb.project.date_expiring
  -- COMMENT 'When it-- COMMENT marked inactive';

CREATE TABLE IF NOT EXISTS qrumb.taskstatusbars (
   tid integer NOT NULL AUTO_INCREMENT,
   tname varchar(20) NOT NULL,
   pid integer NOT NULL,
   pos integer NOT NULL,
   uid integer NOT NULL,
   PRIMARY KEY (tid, uid)
);


-- COMMENT ON TABLE IF NOT EXISTS qrumb.taskstatusbars
  -- COMMENT 'Extends a Project a Project , with Task Schedules
-- dual Primary keys to ensure unique settings for each user';
-- COMMENT ON COLUMN qrumb.taskstatusbars.tid
  -- COMMENT 'Task Column Primary Indexing,';
-- COMMENT ON COLUMN qrumb.taskstatusbars.tname
  -- COMMENT 'Canonical Name Of Task Column,';
-- COMMENT ON COLUMN qrumb.taskstatusbars.pid
  -- COMMENT 'Foreign Key assigning a TaskBar Column to respective Project';
-- COMMENT ON COLUMN qrumb.taskstatusbars.pos
  -- COMMENT 'Posittion Of task Column,';

CREATE TABLE IF NOT EXISTS qrumb.tasks (
   cid integer NOT NULL AUTO_INCREMENT,
   cname varchar(20) NOT NULL,
   tid int NULL,
   cdesc varchar(330),
   assign integer,
   pid int,
   uid integer NOT NULL,
   PRIMARY KEY (cid, uid)
);


-- COMMENT ON TABLE IF NOT EXISTS qrumb.tasks
  -- COMMENT 'Extends Projects Down To Cards';
-- COMMENT ON COLUMN qrumb.tasks.cid
  -- COMMENT 'Card indexing identity Number';
-- COMMENT ON COLUMN qrumb.tasks.cname
  -- COMMENT 'Cards Header';
-- COMMENT ON COLUMN qrumb.tasks.cdesc
  -- COMMENT 'brief task description,';
-- COMMENT ON COLUMN qrumb.tasks.assign
  -- COMMENT 'id of tasks ';

CREATE TABLE IF NOT EXISTS qrumb.people (
   uid integer NOT NULL AUTO_INCREMENT,
   uname varchar(20) NOT NULL UNIQUE,
   uemail varchar(72) NOT NULL UNIQUE,
   upassword varchar(100),
   role char(0),
   PRIMARY KEY (uid)
);
-- COMMENT ON TABLE IF NOT EXISTS qrumb.people
  -- COMMENT 'Table captures Users/Adminstrators to the Projects';
-- COMMENT ON COLUMN qrumb.people.uid
  -- COMMENT 'unique identifying number automatically incremented,';
-- COMMENT ON COLUMN qrumb.people.uname
  -- COMMENT 'Unique username for the purpose of logging in into the system.';
-- COMMENT ON COLUMN qrumb.people.uemail
  -- COMMENT 'users email.';
-- COMMENT ON COLUMN qrumb.people.role
  -- COMMENT 'role of registered  person
-- A = super user
-- M = manager
 -- L = team leader
-- T = team member';

CREATE TABLE IF NOT EXISTS qrumb.projectstatus (
   id smallint NOT NULL AUTO_INCREMENT,
   status char NOT NULL UNIQUE,
   name varchar(10) NOT NULL UNIQUE,
   descr varchar(200),
   PRIMARY KEY (id)
);



-- COMMENT ON TABLE IF NOT EXISTS qrumb.projectstatus
  -- COMMENT 'Stores description of Projects status codes';
-- COMMENT ON COLUMN qrumb.projectstatus.id
  -- COMMENT 'Primary Key For table indexing';
-- COMMENT ON COLUMN qrumb.projectstatus.status
  -- COMMENT 'Character used to represent  project status';
-- COMMENT ON COLUMN qrumb.projectstatus.name
  -- COMMENT 'Canonical name of project status';
-- COMMENT ON COLUMN qrumb.projectstatus.descr
  -- COMMENT 'Description of Project status';

CREATE TABLE IF NOT EXISTS qrumb.permissions (
   pidx integer NOT NULL AUTO_INCREMENT,
   uid integer NOT NULL,
   pr_id integer NOT NULL,
   permission integer NOT NULL,
   PRIMARY KEY (pidx)
);


-- COMMENT ON TABLE IF NOT EXISTS qrumb.permissions
  -- COMMENT 'Specifies the permissions per project of each user.';
