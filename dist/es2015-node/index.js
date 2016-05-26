'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _optsParser = require('./lib/opts-parser');

Object.keys(_optsParser).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _optsParser[key];
    }
  });
});
//# sourceMappingURL=index.js.map
