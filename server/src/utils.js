export function addTotalHeaders(c, arr) {
  c.header("Access-Control-Expose-Headers", "X-Total-Count");
  c.header("X-Total-Count", arr.length);
}

export function fakeId(arr) {
  arr.forEach((i) => {
    i.id = i._id;
    delete i._id;
  });
}
