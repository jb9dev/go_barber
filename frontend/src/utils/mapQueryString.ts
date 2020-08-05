interface QueryMap {
  [key: string]: string;
}

export default function mapQueryString(query: string) {
  const locationQuery = query.replace('?', '').split('&');
  const queryMap: QueryMap = {};

  locationQuery.forEach(query => {
    const queryArray = query.split('=');
    const queryMapKey = queryArray[0];
    const queryMapValue = queryArray[1];

    queryMap[queryMapKey] = queryMapValue;
  });

  return queryMap;
}
