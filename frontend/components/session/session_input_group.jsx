import React from 'react';

export default(props) => {
  return (<div className='input-group'>
    <label className={props.className}>
      {props.type}
      <span className='error-message'>
        {`${props.errorMessage}`}
      </span>
    </label>
    <input onChange={props.onChange} id={props.type} type={props.inputType} value={props.value}></input>
  </div>);
};
