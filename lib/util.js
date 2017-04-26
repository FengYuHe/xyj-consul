/**
 * 格式化service list，使其适用于web层
 * @param obj
 * @return {{}}
 */
exports.format = function(obj) {
  const result = {};
  for (k in obj) {
    result[k] = {
      host: obj[k].Address,
      port: obj[k].Port,
    };
  }
  return result;
};