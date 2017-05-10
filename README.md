# qrumbits
__Description__

Qrumbits is a simple scrum tool. Allowing users to create Scrum type projects 

__A) Instructions to Install and run__

1) pull to predetermined folder
2) copy the contents of ./publichtml to webserver directory,
3) if ./php/ready.x exists delete the file.
4) setup mysql database credential.. see part __B)__ 
5) then get working :-)

__B) Setting up mysql credentials__

1) generate database user cypher as follows
   >>-$ echo -n "root" | base64
2) generate database user password as follows
   >>-$ echo -n "P@ssw0rd" | base64
3) set credentials in the function Q_ueryBuild::setdsn
    ...
    >>-$this->user = 'cm9vdA==';
    >>-$this->pwd = 'cm9vdDEyMzQ=';

