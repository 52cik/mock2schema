# mock2schema

> mock-json 转 json-schema 工具


## 环境需求

> node6 以上版本


## 如何使用

### 安装

```sh
$ yarn add mock2schema
# 或者
$ npm i -S mock2schema
```

### 使用

```js
const mock2schema = require('mock2schema');

const schema = mock2schema({
  "code": 0,
  "message": "ok"
});

console.log(schema);
```

结果如下:

```json
{
  "title": "接口描述",
  "type": "object",
  "properties": {
    "code": {
      "type": "number",
      "description": "字段 {code} 描述"
    },
    "message": {
      "type": "string",
      "description": "字段 {message} 描述"
    }
  },
  "required": [
    "code",
    "message"
  ]
}
```


## API

### mock2schema(data)

#### data

Type: `Object`

任何 mock-json 规范的数据
