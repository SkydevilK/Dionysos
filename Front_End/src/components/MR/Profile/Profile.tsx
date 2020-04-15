import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Icon } from 'antd'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrProfile: {
      borderRadius: "20px",
      boxSizing: "border-box",
      border: "solid 1px #ddd",
      listStyle: "none",
      paddingLeft: "0px", marginLeft: "auto", marginRight: "auto",
    },
    profileHeader: {
      borderBottom: "solid 1px #ddd",
      marginLeft: "auto",
      display: "flex"
    },
    profileHead: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      alignItems: 'center',
      justifyContent: 'center',
      width: "115px",
      height: "48px",
      fontSize: "24px",
      lineHeight: "50px",
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
        <Link to="/MyAccount">
          <button className={classes.margin} onClick={editOpen} style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
            width: "48px",
            height: "48px",
            fontSize: "16px",
            color: "black",
            textAlign: "right",
            alignItems: 'center',
            justifyContent: 'center',
          }}><Icon type="setting" style={{ display: "inline" }} /></button>
        </Link>
      </li>
      <li>
        <button style={{ display: "table", marginLeft: "auto", marginRight: "auto", width: "150px", height: "150px", borderRadius: 400 / 2, backgroundImage: "url(https://www.leagueoflegends.co.kr/upload/EditorImages/20181106170936_Rri9oF7H.png)" }}>
        </button>
      </li>
      <li style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        width: "150px",
        fontSize: "20px"
      }}>
        {sessionStorage.getItem('userInfo')}님
      </li>
      <li style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: "auto",
        marginRight: "auto",
        width: "150px",
        fontSize: "15px"
      }}>
      </li>
    </ul >
  );
}