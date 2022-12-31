function baseFunc(message) {
  console.log("logger:", message);
}

function decorator(func) {
  return function (data) {
    func.apply(this, arguments);

    console.log("decorator:", data);
  };
}

decorator(baseFunc)("hello");
