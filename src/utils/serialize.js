/** superagent
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (Array.isArray(val)) {
    pairs[key] = [];
    val.forEach((item, index) => {
      pushEncodedKeyValuePair(pairs[key], index, item);
    });
    return;
  } else if (isObject(val)) {
    pairs[key] = {};
    Object.keys(val).forEach((i) => {
      if (val[i] != null) {
        pushEncodedKeyValuePair(pairs[key], i, val[i]);
      }
    });
    return;
  }
  if (typeof val === 'string') val = val.replace(/"/g, '\\"');
  pairs[encodeURIComponent(key)] = encodeURIComponent(val);
}

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj != null && typeof obj === 'object';
}

export default function (obj) {
  if (!isObject(obj)) return obj;
  let pairs = {};
  if (Object.prototype.toString.apply(obj).toLowerCase() === '[object array]') {
    pairs = [];
  }

  Object.keys(obj).forEach((key) => {
    if (obj[key] != null) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
    }
  });
  return pairs;
}
