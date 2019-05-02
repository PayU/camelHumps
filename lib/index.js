const camelPattern = /[A-Z]/g;

function camelize(obj, options = {}) {
  if (!(obj instanceof Object)) return obj;

  const { kebab } = options;

  const toSnakeCase = str => str.replace(camelPattern, match => `_${match.toLowerCase()}`);
  const toKebabCase = str => str.replace(camelPattern, match => `-${match.toLowerCase()}`);

  return new Proxy(obj, {
    get: (target, camelCaseKey) => {
      if (typeof camelCaseKey === 'symbol') return target[camelCaseKey];

      if (kebab === true) {
        // kebab-case
        const kebabCase = toKebabCase(camelCaseKey);
        return target[kebabCase] instanceof Object
          ? camelize(target[kebabCase], options)
          : target[kebabCase];
      } else {
        // snake_case
        const snakeCaseKey = toSnakeCase(camelCaseKey);
        return target[snakeCaseKey] instanceof Object
          ? camelize(target[snakeCaseKey])
          : target[snakeCaseKey];
      }
    },
    set: (target, camelCaseKey, value) => {
      const snakeCaseKey = kebab === true ? toKebabCase(camelCaseKey) : toSnakeCase(camelCaseKey);
      // eslint-disable-next-line no-param-reassign
      target[snakeCaseKey] = value;
      return true;
    },
  });
}

module.exports = camelize;
