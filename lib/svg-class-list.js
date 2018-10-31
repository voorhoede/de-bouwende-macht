export default element => ({
  add: name => {
    element.className.baseVal += ` ${name}`;
  },
  remove: name => {
    element.className.baseVal = element.className.baseVal.replace(name, '');
  }
});

