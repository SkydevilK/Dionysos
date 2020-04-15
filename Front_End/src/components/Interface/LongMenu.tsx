import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

// component
import WritePage from './Editor/WirtePage';
import ReviewInfo from './Review';

const useStyles = makeStyles(theme => ({
  // 모달 css
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
}));


// 모달 사이즈 조절
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ITEM_HEIGHT = 48;

interface params{
  review: ReviewInfo
}

export default function LongMenu({review}:params) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

    // 모달 상태 관리
    const [modalStyle] = React.useState(getModalStyle);
    const [openModal, setOpenModal] = React.useState(false);

  


  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {/* {options.map(option => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))} */}
        
        <MenuItem key="수정" onClick={handleClose}>
          수정
        </MenuItem>
              <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleModalClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">My Review</h2>
          <div>
            {/* 에디터 들어갈 공간 */}
            <WritePage review={review} onCancel={handleModalClose} />
          </div>


        </div>
      </Modal>
        {/* 삭제 함수 만들어야 함 */}
        <MenuItem key="삭제" onClick={handleClose}>
          삭제
        </MenuItem>
      </Menu>
    </div>
  );
}