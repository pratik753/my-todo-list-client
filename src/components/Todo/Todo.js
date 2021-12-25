import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import classes from "../../style.module.css";
import { MdDeleteSweep } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { deleteTodo, switchTick } from "../../api/api";
import { CircularProgress } from "@material-ui/core";
import { useState } from "react";

const Todo = (props) => {
  const [switchchange, setswitchChange] = useState(props.switchTick);
  const switchhandle = async () => {
    console.log("Hii");
    if (switchchange === true) {
      await switchTick(props.id, { switchTick: false });
      // props.setDataChange(false);
      setswitchChange(false);
    }
    if (switchchange === false) {
      await switchTick(props.id, { switchTick: true });
      setswitchChange(true);
    }
    cardcss();
    // props.setDataChange(2);
    // props.setDataChange(1);
    // setChange(2);
    // setChange(1);
  };
  const todoCurrentId = () => {
    props.setDataFormEdit(props.id);
    console.log(props.id);
  };
  const todoDeleteHandler = () => {
    deleteTodo(props.id);
    props.setDataChange(2);
    console.log(props.id);
  };
  const styleForPaper = {
    width: "2rem",
    height: "2rem",
  };
  const styleForbody = {
    overflowWrap: "breakWord",
    wordWrap: "breakWord",
    // word-wrap: break-word;
    hyphens: "auto",
  };
  const cardcss = () => {
    if (switchchange === true) {
      console.log("hiii...", `${classes.card} ${classes.red}`);
      return `${classes.red}`;
      // props.setDataChange(false);
    }
    if (switchchange === false) {
      return ``;
    }
  };
  return (
    <span className={cardcss()}>
      <Card sx={{ maxWidth: 345 }} className={classes.card}>
        <CardMedia
          className={classes.imagee}
          component="img"
          alt="green iguana"
          height="140"
          image={props.selectedFile}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={cardcss()}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={styleForbody}
          >
            {props.body}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={styleForbody}
          >
            {props.decpriction}
            {/* {change} */}
          </Typography>
        </CardContent>
        <CardActions>
          <MdDeleteSweep style={styleForPaper} onClick={todoDeleteHandler} />
          <AiFillEdit style={styleForPaper} onClick={todoCurrentId} />
          <Button size="small">Learn More</Button>
        </CardActions>
        <Switch
          checked={switchchange}
          color="secondary"
          onClick={switchhandle}
        />
      </Card>
    </span>
  );
};
export default Todo;
