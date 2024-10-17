export function errorInvalidContentBody(object: object, keys: string[]) {
  for (const key of keys) {
    const [keyString, message] = key.split('|')

    if (!Object.keys(object).includes(keyString)) {
      throw new Error(message, {
        cause: 'INVALID_CONTENT_BODY',
      })
    }
  }

  const objectAux: { [key: string]: number | string } = {
    ...object,
  }

  for (const key of keys) {
    const [keyString, message] = key.split('|')

    if (objectAux[keyString] === undefined) {
      throw new Error(message, {
        cause: 'INVALID_CONTENT_BODY',
      })
    }
  }
}
