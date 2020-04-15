import React from 'react';
import MainContent from './MainContent';
import {RouteComponentProps} from 'react-router-dom';
import MyLikes from './Like/MyLikes';
import MyFriends from './Friends/MyFriends';

interface RouterProps { // type for `match.params`]
  uid : string,
    title: string; // must be type `string` since value comes from the URL
}

interface MyComponentProps extends RouteComponentProps<RouterProps> {
  uid : number,
  title : string;
}
export default function MyPageList(props:MyComponentProps) {
  console.log("jey");
  console.log(props.match);

  let uid = props.match.params.uid;
  if (props.match.params.title=== 'mylikes') {
    return (
      <div><MyLikes /></div>
    );
  }
  else if (props.match.params.title === 'myfriends') {
    return (
      <div><MyFriends uid={4}/></div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}