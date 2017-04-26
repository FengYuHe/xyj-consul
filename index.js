const Consul = require('consul');
const util = require('./lib/util');

class ConsulService {
  constructor(opts){
    this.consul = Consul({ host: opts.host || '127.0.0.1', port: opts.port || 8500 });
  }

  /**
   * 服务注册
   * @param opts
   *  name (String): service name
   *  id (String, optional): service ID
   *  tags (String[], optional): service tags
   *  address (String, optional): service IP address
   *  port (Integer, optional): service port
   *  check (Object, optional): service check
   *    http (String): URL endpoint, requires interval
   *    tcp (String): host:port to test, passes if connection is established, fails otherwise
   *    script (String): path to check script, requires interval
   *    dockercontainerid (String, optional): Docker container ID to run script
   *    shell (String, optional): shell in which to run script (currently only supported with Docker)
   *    interval (String): interval to run check, requires script (ex: 15s)
   *    timeout (String, optional): timeout for the check (ex: 10s)
   *    ttl (String): time to live before check must be updated, instead of http/tcp/script and interval (ex: 60s)
   *    notes (String, optional): human readable description of check
   *    status (String, optional): initial service status
   *    deregistercriticalserviceafter (String, optional, Consul 0.7+): timeout after which to automatically deregister service if check remains in critical state
   *  checks (Object[], optional): service checks (see check above)
   * @param cb
   */
  register(opts, cb) {
    const option = {
      name: opts.name,
      tags: opts.tags || [],
      address: opts.address || '127.0.0.1',
      port: opts.addressPort || opts.port,
    };
    this.consul.agent.service.register(option, (err, result) => {
      if (err)  throw err;
      cb && cb(err, result);
    });
  }

  /**
   * Returns the services the agent is managing
   * @param cb
   */
  list(cb) {
    this.consul.agent.service.list(cb);
  }

  /**
   * 格式化service list，使其适用于web层
   * @param cb
   */
  listFormat(cb){
    this.consul.agent.service.list((err, res) => {
      cb && cb(err, util.format(res));
    });
  }

  /**
   * 返回consul实例
   * @return {ConsulService.consul}
   */
  consul() {
    return this.consul;
  }
}

module.exports = ConsulService;
