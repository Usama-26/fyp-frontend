function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export { isEmpty, classNames };
