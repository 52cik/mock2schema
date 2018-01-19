/**
 * 检测类型，未知的统一为object
 * @param {string} it
 */
function type(it) {
  // json-schema types
  // ("null", "boolean", "object", "array", "number", "string")
  const types = {
    Null: 'null',
    Boolean: 'boolean',
    Number: 'number',
    String: 'string',
    Object: 'object',
    Array: 'array',
  };
  const key = Object.prototype.toString.call(it).slice(8, -1);
  return types[key] || 'object';
}

/**
 * mock-json 转 json-schema
 * @param {any} data
 * @param {string} field
 * @param {object} opts
 */
function mock2schema(data, field = '', opts = { depth: 0 }) {
  const schema = {}; // 文档

  if (opts.depth === 0) {
    schema.title = '接口描述'; // 跟对象才添加 title 字段
  }

  schema.type = type(data); // 对象类型 (json-schema types)

  opts.depth += 1; // 对象深度

  // 对象类型字段处理
  if (schema.type === 'object') {
    const keys = Object.keys(data);

    if (keys.length === 0) {
      return schema;
    }

    schema.properties = {}; // 子属性
    schema.required = keys.map((key) => {
      const name = key.replace(/\|.+/, ''); // 删除 mock 规则
      opts.parent = { key, data: data[key] }; // 传对象给子节点
      schema.properties[name] = mock2schema(data[key], name, opts);
      return name;
    });

    return schema;
  }

  // 数组类型字段处理
  if (schema.type === 'array') {
    if (data.length === 0) {
      return schema;
    }

    schema.items = mock2schema(data[0], '', opts);
    return schema;
  }

  // 其他类型处理
  schema.description = `字段 {${field}} 描述`;
  return schema;
}

module.exports = mock2schema;
