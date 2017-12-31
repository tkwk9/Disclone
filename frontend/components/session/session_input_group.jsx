import React from 'react';

export default (props) => {
  let forgotPassword = props.forgotPassword ?
    <div className="forgot-password">FORGOT YOUR PASSWORD?</div> : null;
  return (
    <div className='input-group'>
      <label
        className={props.className}
        htmlFor={props.type}
      >
        {props.type} <span className='error-message'>
        {`${props.errorMessage}`}
        </span>
      </label>
      <input onChange={props.onChange} id={props.type}
        type={props.inputType} value={props.value}></input>
      {forgotPassword}
    </div>
  );
};
