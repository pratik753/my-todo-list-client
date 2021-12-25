import TextField from "@mui/material/TextField";
// import { TextField, Button, Paper } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import classes from "../../style.module.css";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { createTodo, updateTodo } from "../../api/api";
// import { getTodo } from "../../api/api";
//import SendIcon from "@mui/icons-material/Send";
const FormTodo = (props) => {
  const [loading, setLoading] = useState(false);
  const [todoData, setTodoData] = useState([
    {
      title: "",
      body: "",
      description: "",
      // switctTick: false,
      // selectedFile: "",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      console.log(props.dataFormEdit);
      if (props.dataFormEdit !== 0) {
        console.log(props.todoData);
        const responseData = props.todoData;
        //const responseData = await getTodo();

        // const finddata = responseData.data[0]._id;
        console.log(responseData);
        var finditem = responseData.find(
          (item) => item.id === props.dataFormEdit
        );
        // console.log(finddata);
        console.log(finditem);
        // const datatransfer = {
        //   title: finditem.title,
        //   body: finditem.body,
        //   description: finditem.description,
        //   // selectedFile: finditem.selectedFile,
        // };
        setTodoData(finditem);
        console.log(props.dataFormEdit);
      }
    };
    fetchData();
  }, [props.dataFormEdit, props.todoData]);

  const saveDataHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (props.dataFormEdit === 0) {
      const postrequest = await createTodo(todoData);
      console.log(todoData, postrequest);
    } else {
      const postrequest = await updateTodo(props.dataFormEdit, todoData);
    }
    props.setDataChange(1);
    clearhandler();
    setLoading(false);

    // <CircularProgress />;
  };
  const clearhandler = () => {
    props.setDataFormEdit(0);
    setTodoData({
      title: "",
      body: "",
      description: "",
      selectedFile: "",
    });
  };
  // useEffect(async () => {
  //   let temp = {
  //     title: "pratik",
  //     body: "pppppp",
  //     description: "kumar",
  //   };
  //   const data = await axios.post("http://localhost:5000/todo", temp);
  //   console.log(data);
  // }, []);
  return (
    <>
      <Paper elevation={3} className={classes.pager}>
        {props.dataFormEdit === 0 ? <h2>Create Todo</h2> : <h2>Edit Todo</h2>}

        {loading && <CircularProgress />}
        <form onSubmit={saveDataHandler} autoComplete="off" noValidate>
          <TextField
            placeholder="Title"
            name="title"
            variant="outlined"
            fullWidth
            // className={classes.field}
            value={todoData.title}
            onChange={(e) => {
              setTodoData({ ...todoData, title: e.target.value });
            }}
          />
          <br />
          <br />
          <TextField
            name="body"
            placeholder="Body"
            variant="outlined"
            fullWidth
            // className={classes.field}
            value={todoData.body}
            onChange={(e) => {
              setTodoData({ ...todoData, body: e.target.value });
            }}
          />
          <br />
          <br />
          <TextField
            name="description"
            //  id="outlined-basic"
            placeholder="Description"
            variant="outlined"
            fullWidth
            // className={classes.field}
            value={todoData.description}
            onChange={(e) => {
              setTodoData({ ...todoData, description: e.target.value });
            }}
          />
          <br />
          <br />
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setTodoData({ ...todoData, selectedFile: base64 })
            }
          />
          <Button variant="contained" fullWidth type="submit">
            Save
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            fullWidth
            style={{ background: "red" }}
            onClick={clearhandler}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};
export default FormTodo;
