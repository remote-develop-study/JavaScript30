const curry = (f, len = f.length - 1) =>
  function _recur(...args) {
    return args.length > len
      ? f(...args)
      : (...args2) => _recur(...args, ...args2);
  };

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const item of iter) {
    acc = f(acc, item);
  }

  return acc;
}, 1);

const pipe = (f1, ...fns) => (...args) =>
  reduce((acc, f) => f(acc), f1(...args), fns);

const go = (a, ...fns) => pipe(...fns)(a);

const takeWhile = curry(function(predicate, iter) {
  const res = [];
  let i = 0;

  for (const item of iter) {
    if (!predicate(item, i++)) break;
    res.push(item);
  }

  return res;
});

const curry1 = f => (a, ...args) =>
  args.length ? f(a, ...args) : (...args) => f(a, ...args);

const take = curry1((len, iter) => takeWhile((_, i) => i < len, iter));

const takeAll = take(Infinity);

const L = {};

L.map = curry(function*(f, iter) {
  for (const item of iter) yield f(item);
});

const map = curry1(
  pipe(
    L.map,
    takeAll
  )
);
