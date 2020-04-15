import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import MyAccount from '../../App/MyAccount';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrProfile: {
      borderRadius: "5px",
      // width: "331px",
      boxSizing: "border-box",
      background: "#fff",
      // borderRadius: "3px",
      border: "solid 1px #ddd",
      fontSize: "12px",
      listStyle: "none",
      paddingLeft: "0px"
    },
    profileHeader: {
      borderBottom: "solid 1px #ddd",
      marginLeft: "10px",
      display: "flex",
      padding: ""
    },
    profileHead: {
      margin: "12px 0px",
      fontSize: "20px",
      fontWeight: "bold"
    },
    liCommon: {
      margin: "10px"
    },
    margin: {

      margin: theme.spacing(1),
    
    }

  })
);



interface authorities {
  authority: string
}
interface follower {

}
interface following {

}
interface likes {
  foodMatch: string,
  grade: string,
  grape: string,
  info: string,
  likeNum: number,

  nameEng: string,
  nameKor: string,
  sparkling: boolean,
  sweet: number,
  tannin: number,
  type: string,
  visit: number,
  whenUse: string,
  wid: number,
  winery: string
}

interface data {
  authorities: Array<authorities>
  email: string,
  follower: Array<follower>,
  following: Array<following>,
  likes: Array<likes>,
  nickName: string,
  uid: number,
  username: string
}

interface User {
  code: number,
  data: data,
  msg: string,
  success: boolean,
}


export default function Profile(profile: User) {
  const classes = useStyles();
  const [edit, setEdit] = React.useState(false);
  
  const editOpen = () => {
    setEdit(true);
  };
  const editClose = () => {
    setEdit(false);
  };

  // onclick 함수?
  return (
    <ul className={classes.mrProfile}>
      <li className={classes.profileHeader}>
        <div className={classes.profileHead}>Profile</div>
        <Link
                // noWrap
                // key={button.title}
                // variant="body2"
                to="/MyAccount"
              >
        <Button size="small" className={classes.margin} onClick={editOpen}><EditIcon fontSize="small" /></Button>
        </Link>
      </li>
      <li className={classes.liCommon}>
        닉네임: {profile.data.nickName}
      </li>
      <li className={classes.liCommon}>
        e-mail: {profile.data.email}
      </li>
      <li className={classes.liCommon}>
        선호와인: {profile.data.likes.map((like) => {return like.nameKor})}
      </li>

    </ul>
  );
}