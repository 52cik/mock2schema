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
    Array: 'array'
  };
  const key = Object.prototype.toString.call(it).slice(8, -1);
  return types[key] || 'object';
}

/**
 * mock-json 转 json-schema
 * @param {any} data
 */
function mock2schema(data, name) {
  const schema = {
    title: '接口描述',
    description: `字段 {${name}} 描述`,
    type: type(data)
  };

  switch (schema.type) {
    case 'object':
      delete schema.description; // 描述字段
      schema.properties = {};
      const keys = []; // 去除 mock 规则的所有 key
      Object.keys(data).forEach(key => {
        const name = key.replace(/\|.+/, ''); // 删除 mock 规则
        keys.push(name);
        const subSchema = mock2schema(data[key], name);
        delete subSchema.title; // 删子文档标题
        schema.properties[name] = subSchema;
      });
      schema.required = keys; // 必选 key
      break;
    case 'array':
      delete schema.description; // 描述字段
      schema.items = {};
      if (data[0]) {
        const subSchema = mock2schema(data[0]);
        delete subSchema.title; // 删子文档标题
        schema.items = subSchema;
      }
      break;
  }

  return schema;
}

module.exports = mock2schema;
