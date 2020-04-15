import React, { Component } from 'react'; 
import { withRouter } from 'react-router'; 
import {RouteComponentProps} from 'react-router';

class ScrollToTop extends React.Component<RouteComponentProps<any>>  {
     componentDidUpdate(prevProps : any) { 
         if (this.props.location !== prevProps.location) {
              window.scrollTo(0, 0) }
    } 
    
    render() { 
        return this.props.children
    
    } 

} export default withRouter(ScrollToTop)
