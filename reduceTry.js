Array.prototype.reduce3 = function (cb, initialVal) {
  var arrayInput = this;
  var result, i;
  if (initialVal !== undefined) {
    result = initialVal;
    i = 0;
  } else {
    result = arrayInput[0];
    i =1;
  }
  var length = this.length;
  var p = new Promise(function (resolve, reject) {
    function rec (cb, i) {
      var pr = cb(result, arrayInput[i]);
      pr.then(function (val) {
        result = val;
        if (i < length-1) {
          rec(cb, i+1);
        }else {
          resolve(result);
        }
      });
    }
    rec(cb,i);
  });
  return p;
}

var p = [1,2,3,4,5,6].reduce3(function (acc, val) {
  return new Promise(function (res, rej) {
    setTimeout(res(acc+val), 100);
  });
}, 0);

p.then(function (val) {
  console.log(val);
});


var p2 = ['1','2','3','4','5','6'].reduce3(function (acc, val) {
  return new Promise(function (res, rej) {
    setTimeout(res(acc+val), 100);
  });
});

p2.then(function (val) {
  console.log(val);
});
