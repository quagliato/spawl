# SPAWL

## Simple Persistence Abstraction Awesome Layer

I've started this "library" almost a year ago, to suply my need of fast switch
between database engines.

So I've developed this package with an possibility of connecting to different
database engines through custom connectors.

The first one was a MySQL/MariaDB connector, now I'm polishing a MongoDB 
connector.

## Example

This is an example using the MariaDB connector.

    var SPAWLConnectorMariaDB = require('spawl-mariadb');
    var SPAWL                 = require('spawl');

    var mariaDBConnector = new SPAWLConnectorMariaDB({
      "DB\_HOST": "localhost",
      "DB\_USER": "root",
      "DB\_NAME": "example",
      "DB\_PASS": ""
    });

    var spawl = new SPAWL(mariaDBConnector);

    var filter = {
      "filter": {
        "field": "field1",
        "operator": "=",
        "value": "1"
      }
    };

    var page = 1;
    var pageSize = 20;

    var order = undefined;

    spawl.get("entity", ["field1", "field2"], filter, order, page, pageSize, function(size, rows){
      console.log(rows);
    });

## Connector

* MariaDB/MySQL - https://npmjs.org/spawl-mariadb
* MongoDB - https://npmjs.org/spawl-mongodb

## Keep In Touch

eduardo@quagliato.me :)

