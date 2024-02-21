// 动态导入所有 store
// const storeModules = import.meta.glob('./**/*.ts', { eager: true });
type StoreType = Record<string, any>;
const storeModules = import.meta.glob('./**/*.ts', { eager: true });
const ids: string[] = [];
const names: string[] = [];
const stores: Record<string, any> = {};
for (const path in storeModules) {
  if (path.startsWith('./index')) {
    continue; // 跳过 index 文件
  }
  const moduleExports: Record<string, StoreType> = storeModules[path] as Record<string, StoreType>;
  Object.keys(moduleExports).forEach((exportName) => {
    const store = moduleExports[exportName];
    const id = store.$id
    if (typeof id !== 'string') {
      console.warn(`$id:${id} 必须为 string in ${path}: ${exportName}`);
      return;
    }

    if (ids.includes(id)) {
      throw new Error(`$id:${id} 重复 in ${path}: ${exportName}`);
    }

    if (names.includes(exportName)) {
      throw new Error(`exportName:${exportName} 重复 in ${path}: ${id}`);
    }
    
    ids.push(store.$id);
    names.push(exportName);
    stores[exportName] = store;
  })
}

export default stores;
