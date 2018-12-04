/**
 * @fileoverview gRPC-Web generated client stub for helloworld
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.helloworld = require('./helloworld_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.helloworld.GreeterClient =
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
proto.helloworld.GreeterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.helloworld.GreeterClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.helloworld.GreeterClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.helloworld.Empty,
 *   !proto.helloworld.TaskResponse>}
 */
const methodInfo_Greeter_ListTasks = new grpc.web.AbstractClientBase.MethodInfo(
  proto.helloworld.TaskResponse,
  /** @param {!proto.helloworld.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.helloworld.TaskResponse.deserializeBinary
);


/**
 * @param {!proto.helloworld.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.helloworld.TaskResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.helloworld.TaskResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.helloworld.GreeterClient.prototype.listTasks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/helloworld.Greeter/ListTasks',
      request,
      metadata,
      methodInfo_Greeter_ListTasks,
      callback);
};


/**
 * @param {!proto.helloworld.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.helloworld.TaskResponse>}
 *     The XHR Node Readable Stream
 */
proto.helloworld.GreeterPromiseClient.prototype.listTasks =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.listTasks(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.helloworld;

