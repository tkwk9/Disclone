import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import ContentContainer from './content_container';
import { connect } from 'react-redux';

class Content extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.pathArray = this.processPath(this.props.currentPath, this.props.dmList);
    if (this.props.location.pathname !== this.pathArray[0]){
      this.props.history.push(this.pathArray[0]);
    }
  }

  componentWillReceiveProps(newProps){
    this.pathArray = this.processPath(newProps.currentPath, newProps.dmList);
    if (newProps.location.pathname !== this.pathArray[0]){
      newProps.history.push(this.pathArray[0]);
    }
  }

  processPath(currentPath, dmList) {
    let pathArray = pathToArray(currentPath);

    if (pathArray.length === 0 || pathArray.length > 2) {
      return ['/@me','friends_list', null];
    }
    else if (pathArray[0] === '@me'){
      if (pathArray[1] === undefined){
        return ['/@me','friends_list', null];
      } else {
        if (dmList.includes(pathArray[1])){
          return ['/@me/' + pathArray[1],'DM', pathArray[1]];
        } else {
          return ['/@me','friends_list', null];
        }
      }
    } else {
      return ['/@me','friends_list', null]; // TODO: handle servers
    }
  }
  render(){
    return (
      <ContentContainer mode={this.pathArray[1]} code={this.pathArray[2]}/>
    );
  }
}

// const Content = (props) => {
//   let pathArray = processPath(props.currentPath, props.dmList);
//   if (props.location.pathname !== pathArray[0]){
//     props.history.push(pathArray[0]);
//     return <div></div>;
//   }
//   return (
//     <Route path={pathArray[0]} render={() => {
//         return (
//           <ContentContainer mode={pathArray[1]} code={pathArray[2]}/>
//         );
//     }}/>
//   );
//
// };



const pathToArray = (path) => {
  let pathArray = [];
  path.split('/').forEach((el) => {
    if (el !== "") {
      pathArray.push(el);
    }
  });
  return pathArray;
};

const mapStateToProps = (state, ownProps )=> {
  return {
    currentPath: ownProps.location.pathname,
    dmList: Object.keys(state.entities.directMessages)
  };
};

export default withRouter(
  connect(mapStateToProps, null)(Content)
);
