-- Database: CrumBits
-- Author: Timothy Tavonga Mugadza
CREATE DATABASE crumbits
   WITH OWNER = postgres
      ENCODING = 'UTF8'
      TABLESPACE = pg_default
      CONNECTION LIMIT = -1;

COMMENT ON DATABASE crumbits
   IS 'Scrum Task Allocator
';