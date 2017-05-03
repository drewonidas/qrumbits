-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS Qrumb.`Project`;
-- DROP TABLE IF EXISTS Qrumb.`TaskStatusBars`;
-- DROP TABLE IF EXISTS Qrumb.`Tasks`;
-- DROP TABLE IF EXISTS Qrumb.`People`;
-- DROP TABLE IF EXISTS Qrumb.`ProjectStatus`;
-- DROP TABLE IF EXISTS Qrumb.`Permissions`;
-- DROP TABLE IF EXISTS Qrumb.`Templates`;
-- DROP TABLE IF EXISTS Qrumb.`Events`;
-- DROP TABLE IF EXISTS Qrumb.`EventLog`;
-- DROP TABLE IF EXISTS Qrumb.`EventView`;
-- SET FOREIGN_KEY_CHECKS = 1;
CREATE SCHEMA IF NOT EXISTS Qrumb;
USE Qrumb;

CREATE TABLE IF NOT EXISTS Qrumb.`Project` (
    `projectid` NUMERIC(11) NOT NULL,
    `projectname` VARCHAR(30) NOT NULL,
    `date_created` DATE NOT NULL,
    `date_modified` DATETIME NOT NULL,
    `status` VARCHAR(1),
    `userid` NUMERIC(11) NOT NULL,
    `projectDesc` VARCHAR(200),
    `date_expiring` DATE ,
    PRIMARY KEY (`projectid`, `userid`)
    -- UNIQUE (`projectid`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`TaskStatusBars` (
    `taskstatusid` NUMERIC(6) NOT NULL,
    `taskstatusname` VARCHAR(20) NOT NULL,
    `projectid` NUMERIC(11) NOT NULL,
    `Pos` NUMERIC(2) NOT NULL,
    `userid` NUMERIC(11) NOT NULL,
    PRIMARY KEY (`taskstatusid`, `userid`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`Tasks` (
    `taskid` NUMERIC(11) NOT NULL,
    `cname` VARCHAR(20) NOT NULL,
    `taskstatusid` NUMERIC(6) NOT NULL,
    `taskdesc` VARCHAR(330),
    `assign` NUMERIC(11),
    `projectid` NUMERIC(11),
    `userid` NUMERIC(11) NOT NULL,
    PRIMARY KEY (`taskid`, `userid`)
     -- UNIQUE (`taskid`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`People` (
    `userid` NUMERIC(11) NOT NULL,
    `username` VARCHAR(36) NOT NULL,
    `useremail` VARCHAR(72) NOT NULL,
    `role` VARCHAR(2),
    `userpassword` VARCHAR(66) NOT NULL,
    PRIMARY KEY (`userid`),
    UNIQUE (`username`, `useremail`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`ProjectStatus` (
    `statusid` NUMERIC(2) NOT NULL,
    `status` VARCHAR(1) NOT NULL,
    `descr` VARCHAR(200),
    PRIMARY KEY (`statusid`),
    UNIQUE (`status`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`Permissions` (
    `pidx` NUMERIC(12) NOT NULL,
    `userid` NUMERIC(11) NOT NULL,
    `project_id` NUMERIC(11) NOT NULL,
    `permission` NUMERIC(1) NOT NULL,
    PRIMARY KEY (`pidx`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`Templates` (
    `templateid` NUMERIC(12) NOT NULL,
    `projectid` NUMERIC(11) NOT NULL,
    `template_projectid` NUMERIC(11) NOT NULL,
    `project_userid` NUMERIC(11) NOT NULL,
    `template_userid` NUMERIC(11) NOT NULL,
    PRIMARY KEY (`templateid`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`Events` (
    `code` NUMERIC(4) NOT NULL,
    `message` VARCHAR(500) NOT NULL,
    PRIMARY KEY (`code`),
    UNIQUE (`code`)
);

CREATE TABLE IF NOT EXISTS Qrumb.`EventLog` (
    `eventlogid` NUMERIC(11) NOT NULL,
    `code` NUMERIC(4) NOT NULL,
    `eventtrace` VARCHAR(500) NOT NULL,
    `eventdate` DATETIME NOT NULL,
    PRIMARY KEY (`eventlogid`)
);



-- ALTER TABLE `TaskStatusBars` ADD FOREIGN KEY (`projectid`) REFERENCES `Project`(`projectid`);
ALTER TABLE `Tasks` ADD FOREIGN KEY (`taskstatusid`) REFERENCES `TaskStatusBars`(`taskstatusid`);

INSERT INTO Qrumb.Project (projectid,projectname,date_created,date_modified,userid,date_expiring) VALUES (1,"DEFAULT",now(),now(),0,DATE_ADD(NOW(),INTERVAL 1 YEAR)) ON DUPLICATE KEY UPDATE date_modified=now();
INSERT INTO Qrumb.Project (projectid,projectname,date_created,date_modified,userid,date_expiring) VALUES (2,"TEMPLATE 1",now(),now(),0,DATE_ADD(NOW(),INTERVAL 1 YEAR)) ON DUPLICATE KEY UPDATE date_modified=now();
INSERT INTO Qrumb.Project (projectid,projectname,date_created,date_modified,userid,date_expiring) VALUES (3,"TEMPLATE 2",now(),now(),0,DATE_ADD(NOW(),INTERVAL 1 YEAR)) ON DUPLICATE KEY UPDATE date_modified=now();