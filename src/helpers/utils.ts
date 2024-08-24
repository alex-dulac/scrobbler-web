// Utility function to convert a snake_case string to camelCase
export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, g1) => g1.toUpperCase());
};

// Recursive utility function to map keys to camelCase
export const mapKeysToCamelCase = <T extends Record<string, any>>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map(item => mapKeysToCamelCase(item)) as unknown as T;
  } else if (obj !== null && typeof obj === 'object') {
    const result: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      const newKey = toCamelCase(key);
      result[newKey] = mapKeysToCamelCase(obj[key]);
    });

    return result as T;
  }
  return obj;
};
