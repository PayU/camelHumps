const camelPattern = /[A-Z]/g;

function camelize(obj, options = {}) {
  const { kebab } = options;

  // const replacer = match => (kebab ? `-${match.toLowerCase()}` : `_${match.toLowerCase()}`);
  const toSnakeCase = str => str.replace(camelPattern, match => `_${match}`).toLowerCase();
  const toKebabCase = str => str.replace(camelPattern, match => `-${match}`).toLowerCase();

  return new Proxy(obj, {
    get: (target, camelCaseKey) => {
      if (typeof camelCaseKey === 'symbol') return target[camelCaseKey];

      // snake case
      const snakeCaseKey = toSnakeCase(camelCaseKey);
      if (target[snakeCaseKey]) {
        return target[snakeCaseKey] instanceof Object
          ? camelize(target[snakeCaseKey])
          : target[snakeCaseKey];
      }

      // kebab case
      const kebabCase = toKebabCase(camelCaseKey);
      return target[kebabCase] instanceof Object
        ? camelize(target[kebabCase])
        : target[kebabCase];
    },
    set: (target, camelCaseKey, value) => {
      const snakeCaseKey = kebab ? toKebabCase(camelCaseKey) : toSnakeCase(camelCaseKey);
      target[snakeCaseKey] = value;
    },
  });
}

module.exports = camelize;
