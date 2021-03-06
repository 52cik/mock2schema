# mock2schema

> mock-json to json-schema

[中文文档](README.zh-CN.md)

## Requirements

> node6 or higher


## How to use it

### Install

```sh
$ yarn add mock2schema
# or
$ npm i -S mock2schema
```

### Usage

```js
const mock2schema = require('mock2schema');

const schema = mock2schema({
  "code": 0,
  "message": "ok"
});

console.log(schema);
```

The return data is as follows:

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
