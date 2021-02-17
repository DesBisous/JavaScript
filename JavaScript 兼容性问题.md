#  JavaScript 兼容性问题

这里将会记录一些，本人遇到的 JavaScript 兼容性问题的解决方案。

## JavaScript 原生的trim()函数的兼容解决方案。
ie 7 8浏览器中，如果使用trim()属性去除空格的话，则会导致报错。

```js
String.prototype.trim = function () {
	return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
}
```