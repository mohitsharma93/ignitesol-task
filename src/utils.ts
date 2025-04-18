export function objectToQueryParam(queryParamObject: any = {}) {
  const query = Object.keys(queryParamObject)
    .map((value) => {
      const objectValue = isPrimitive(queryParamObject[value])
        ? queryParamObject[value]
        : JSON.stringify(queryParamObject[value]);
      return `${value}=${objectValue}`;
    })
    .join('&');
  return query;
}

function isPrimitive(value: any) {
  return (
    value == null || (typeof value !== 'function' && typeof value !== 'object')
  );
}

export function getQueryParams(url: string) {
  const queryString = url.split('?')[1] || '';
  const params = new URLSearchParams(queryString);
  const result: {
    [key: string]: any
  } = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}