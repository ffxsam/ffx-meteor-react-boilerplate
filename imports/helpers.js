export function globalizeData(mongoCollection, astroClass) {
  if (process.env.NODE_ENV === 'development') {
    global.Collections = Object.assign({}, global.Collections, mongoCollection);
    global.Models = Object.assign({}, global.Models, astroClass);
  }
}
