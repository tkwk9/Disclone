export const processErrors = (errors) => { // TODO: Move this logic to backend
  let errorObj = {
    email: {
      className: "",
      errorMessage: ""
    },
    username: {
      className: "",
      errorMessage: ""
    },
    password: {
      className: "",
      errorMessage: ""
    }
  };
  errors.forEach((error) => {
    let category = error.split(" ")[0].toLowerCase();
    errorObj[category].className = 'error';
    errorObj[category].errorMessage = `(${error})`;
  });
  return errorObj;
};
