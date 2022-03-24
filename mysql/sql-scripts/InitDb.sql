CREATE USER IF NOT EXISTS "egide"@"localhost" IDENTIFIED BY "dbadmin_123";
GRANT ALL ON *.* TO 'egide'@'localhost';

CREATE DATABASE IF NOT EXISTS billing_system;