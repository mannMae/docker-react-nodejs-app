FROM mysql:5.6

COPY ./sqls/initialize.sql /docker-entrypoint-initdb.d/
ADD ./my.cnf /etc/mysql/conf.d/my.cnf
