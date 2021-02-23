function deepClone(origin, hasMap = new WeakMap()) {
  if (!origin || typeof origin !== 'object') return origin;  // 空或者非对象则返回本身

  if (origin instanceof Date) {
    return new Date(origin);
  }

  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  // 如果这个对象已经被记录则直接返回
  if( hasMap.get(origin) ) {
    return hasMap.get(origin);
  }

  // 这个对象还没有被记录，将其引用记录在 hasMap 中，进行拷贝    
  // const result = Array.isArray(origin) ? [] : {};  // 拷贝结果
  const result = new origin.constructor(); // 高级货

  hasMap.set(origin, result); // 记录引用关系

  for(let key in origin){
    if(origin.hasOwnProperty(key)) {
      result[key] = deepClone(origin[key]);
    }
  }
  return result;
}

