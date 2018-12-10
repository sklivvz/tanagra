module.exports = function serializable(nestedClazzes) {
  return function decorator(clazz) {
    const fieldTypes = nestedClazzes && new Map(nestedClazzes.map(klass => [klass._serializationKey, klass]))
    Reflect.defineProperty(clazz, '_fieldTypes', {
      get: function _fieldTypes() { return fieldTypes },
      configurable: true
    })

    const serializationKey = clazz.name
    Reflect.defineProperty(clazz, '_serializationKey', {
      get: function _serializationKey() { return serializationKey },
      configurable: true
    })

    const ctorHandler = {
      construct (target, args) {
        const instance = new target(...args)
        instance._serializationKey = serializationKey
        return instance
      }
    }

    return new Proxy(clazz, ctorHandler)
  }
}
