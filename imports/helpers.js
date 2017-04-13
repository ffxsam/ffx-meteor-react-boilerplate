export function globalizeData(mongoCollection) {
  if (process.env.NODE_ENV === 'development') {
    global.Collections = Object.assign({}, global.Collections, mongoCollection);
  }
}

export function promisifyMethod(method) {
  let canceled = false;

  return {
    call(...args) {
      return new Promise((resolve, reject) => {
        method.call(...args, (error, result) => {
          if (canceled) reject({ isCanceled: true });

          if (!error) resolve(result);
          else reject(error);
        });
      });
    },
    cancel() {
      canceled = true;
    },
  };
}
