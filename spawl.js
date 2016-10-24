// Persistence Abstraction module
// SPAWL - Simple Persistence Abstraction Awsome Layer
// Created by Eduardo Quagliato <eduardo@quagliato.me>
// Date: 2015-09-23
// Location: Curitiba, Brasil

// Adds the possibility of a .format() on String.
String.prototype.format = function()
{
   var content = this;
   for (var i=0; i < arguments.length; i++)
   {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
   }
   return content;
};

// The best way to verify if a variable is filled.
var _filled = function(value){
  if (value !== null && value !== undefined) {
    if (typeof value === "string" && value !== "") return true;
    if (typeof value === "function") return true;
    if (typeof value === "boolean" && (value === true || value === false)) return true;
    if (typeof value === "number") return true;
    if (typeof value === "object") {
      if (value.hasOwnProperty("length") && value.length > 0) return true;
      var count = 0;
      for (var prop in value) {
        count++;
      }
      if (count > 0) return true;
    }
  }
  return false;
};

var SPAWL = function(connector){
  if (connector === undefined) {
    console.log("No connector defined.");
    console.log(new Error().stack);
    process.exit(0);
  }

  this.spawlConnector = connector;

  var spawlObj = this;

  this.get = function(entity, fields, filter, order, page, size, callback){
    if (spawlObj.spawlConnector === undefined) {
      console.log("No connector defined.");
      console.log(new Error().stack);
      process.exit(0);
    }

    spawlObj.spawlConnector.get(entity, fields, filter, order, page, size, function(size, rows){
      if (size > 0) {
        callback(size, rows);
      } else {
        callback(0);
      }
    });
  };

  this.update = function(entity, object, fields, filter, callback){
    if (spawlObj.spawlConnector === undefined) {
      throw new Exception("No connector defined.");
    }

    spawlObj.spawlConnector.update(entity, object, fields, filter, function(size, rows){
      var problem = false;
      if (size != 0) {
        // problem
        problem = true;
      }

      callback(problem, rows);
    });
  };

  this.save = function(entity, object, callback){
    if (spawlObj.spawlConnector === undefined) {
      throw new Exception("No connector defined.");
    }

    spawlObj.spawlConnector.save(entity, object, function(size, rows){
      var problem = false;
      if (size != 0) {
        // problem
        problem = true;
      }

      callback(problem, rows);
    });
  };

  this.delete = function(entity, filter, callback){
    if (spawlObj.spawlConnector === undefined) {
      throw new Exception("No connector defined.");
    }

    spawlObj.spawlConnector.delete(entity, filter, function(size, rows){
      var problem = false;
      if (size != 0) {
        // problem
        problem = true;
      }

      callback(problem, rows);
    });
  };

  return this;
};

module.exports = SPAWL;

