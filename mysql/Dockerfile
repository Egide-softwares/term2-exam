# MYSQL latest image
FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD= 
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_USER=egide
ENV MYSQL_PASSWORD=dbadmin_123
ENV MYSQL_DATABASE=billing_system

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

EXPOSE 3306