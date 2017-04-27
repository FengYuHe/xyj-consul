# xyj-consul
结合smartsport项目架构使用，接口使用[node-consul](https://github.com/silas/node-consul)搭建，在node-consul的基础上封装易于结合smartsport项目使用的接口

## Installation
install via NPM

```sh
$ npm install --save xyj-consul
```
## Example Usage

创建实例：
```js
const Consul = require('xyj-consul');

const consul = new Consul({host: 127.0.0.1, port: 8500}); // default: host-127.0.0.1, port-8500
```

服务注册：
```js
const opts = {
  name: 'example',
  tags: ['example'],
  address: '127.0.0.1',
  servicePort: '10001'
};
consul.register(opts);

```

服务发现(格式化适用于web层)：
```js
consul.listFormat((err, result) => {
  if(err) throw err;
  console.log(result);
  /*
  { example: { host: '127.0.0.1', port: 8500 },
  example1: { host: '127.0.0.1', port: 8500 },
  example2: { host: '127.0.0.1', port: 8500 } }
  */
})
```

## API
### consul.register(options, callback)
Registers a new service.

Options

 * name (String): service name
 * id (String, optional): service ID
 * tags (String[], optional): service tags
 * address (String, optional): service IP address
 * port (Integer, optional): service port
 * check (Object, optional): service check
   * http (String): URL endpoint, requires interval
   * tcp (String): host:port to test, passes if connection is established, fails otherwise
   * script (String): path to check script, requires interval
   * dockercontainerid (String, optional): Docker container ID to run script
   * shell (String, optional): shell in which to run script (currently only supported with Docker)
   * interval (String): interval to run check, requires script (ex: `15s`)
   * timeout (String, optional): timeout for the check (ex: `10s`)
   * ttl (String): time to live before check must be updated, instead of http/tcp/script and interval (ex: `60s`)
   * notes (String, optional): human readable description of check
   * status (String, optional): initial service status
   * deregistercriticalserviceafter (String, optional, Consul 0.7+): timeout after
   which to automatically deregister service if check remains in critical state
 * checks (Object[], optional): service checks (see `check` above)

Usage

```js
consul.register('example', function(err) {
  if (err) throw err;
});
```
### consul.list(callback)

Returns the services the agent is managing.

Usage

```js
consul.list(function(err, result) {
  if (err) throw err;
});
```

Result

``` json
{
  "example": {
    "ID": "example",
    "Service": "example",
    "Tags": [
      "dev",
      "web"
    ],
    "Port": 80
  }
}
```

### consul.listFormat(callback)

返回格式化后适合web服务层使用的列表格式

Usage

```js
consul.listFormat(function(err, result) {
  if (err) throw err;
});
```
Result

```js
{ 
  example: { 
    host: '127.0.0.1', 
    port: 8500 
  },
  example1: { 
    host: '127.0.0.1', 
    port: 8500 
  },
  example2: { 
    host: '127.0.0.1', 
    port: 8500 
  }
}
```

### consul.consul

直接返回[node-consul](https://github.com/silas/node-consul)实例
