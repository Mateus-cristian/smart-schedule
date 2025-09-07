import { mapKeys, isArray, isObject, camelCase, snakeCase } from "lodash";

export function deepToCamelCase(obj: any): any {
  if (isArray(obj)) return obj.map(deepToCamelCase);
  if (isObject(obj)) {
    return Object.entries(obj).reduce((acc, [k, v]) => {
      acc[camelCase(k)] = deepToCamelCase(v);
      return acc;
    }, {} as any);
  }
  return obj;
}

export function toCamelCase(obj: any): any {
  if (isArray(obj)) return obj.map(toCamelCase);
  if (isObject(obj)) {
    return mapKeys(obj, (_v, k) => camelCase(k));
  }
  return obj;
}

export function toSnakeCase(obj: any): any {
  if (isArray(obj)) return obj.map(toSnakeCase);
  if (isObject(obj)) {
    return mapKeys(obj, (_v, k) => snakeCase(k));
  }
  return obj;
}
