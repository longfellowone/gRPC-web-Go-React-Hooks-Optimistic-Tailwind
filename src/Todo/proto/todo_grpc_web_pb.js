/**
 * @fileoverview gRPC-Web generated client stub for Todo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.Todo = require('./todo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Todo.TodoClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Todo.TodoPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.Todo.TodoClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.Todo.TodoClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Todo.Empty,
 *   !proto.Todo.TaskResponse>}
 */
const methodInfo_Todo_ListTasks = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Todo.TaskResponse,
  /** @param {!proto.Todo.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Todo.TaskResponse.deserializeBinary
);


/**
 * @param {!proto.Todo.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Todo.TaskResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Todo.TaskResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.Todo.TodoClient.prototype.listTasks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Todo.Todo/ListTasks',
      request,
      metadata,
      methodInfo_Todo_ListTasks,
      callback);
};


/**
 * @param {!proto.Todo.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Todo.TaskResponse>}
 *     The XHR Node Readable Stream
 */
proto.Todo.TodoPromiseClient.prototype.listTasks =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.listTasks(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Todo.Task,
 *   !proto.Todo.Empty>}
 */
const methodInfo_Todo_NewTask = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Todo.Empty,
  /** @param {!proto.Todo.Task} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Todo.Empty.deserializeBinary
);


/**
 * @param {!proto.Todo.Task} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Todo.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Todo.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.Todo.TodoClient.prototype.newTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Todo.Todo/NewTask',
      request,
      metadata,
      methodInfo_Todo_NewTask,
      callback);
};


/**
 * @param {!proto.Todo.Task} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Todo.Empty>}
 *     The XHR Node Readable Stream
 */
proto.Todo.TodoPromiseClient.prototype.newTask =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.newTask(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Todo.RemoveTaskRequest,
 *   !proto.Todo.Empty>}
 */
const methodInfo_Todo_RemoveTask = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Todo.Empty,
  /** @param {!proto.Todo.RemoveTaskRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.Todo.Empty.deserializeBinary
);


/**
 * @param {!proto.Todo.RemoveTaskRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Todo.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Todo.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.Todo.TodoClient.prototype.removeTask =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Todo.Todo/RemoveTask',
      request,
      metadata,
      methodInfo_Todo_RemoveTask,
      callback);
};


/**
 * @param {!proto.Todo.RemoveTaskRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Todo.Empty>}
 *     The XHR Node Readable Stream
 */
proto.Todo.TodoPromiseClient.prototype.removeTask =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.removeTask(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.Todo;

