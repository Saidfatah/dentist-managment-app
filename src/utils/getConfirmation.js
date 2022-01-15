export default () => {
  // eslint-disable-next-line no-restricted-globals
  var retVal = confirm("voulez vous fermez la feniter ?");
  if (retVal === true) {
    return true;
  } else {
    return false;
  }
};
