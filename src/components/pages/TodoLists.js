import FormTodo from "../Todo/FormTodo";
import Todo from "../Todo/Todo";
import classes from "../../style.module.css";
import { getTodo } from "../../api/api";
import { useState, useEffect } from "react";
import { tableContainerClasses } from "@mui/material";
import { CircularProgress, Grid } from "@material-ui/core";
const TodoLists = (props) => {
  const [loading, setLoading] = useState(false);
  const [todoData, setTodoData] = useState([]);

  const [dataFormEdit, setDataFormEdit] = useState(0);

  useEffect(() => {
    // const data = await axios.get("http://localhost:5000/todo");
    // console.log(data);
    setLoading(true);
    const getdataApi = async () => {
      const responseData = await getTodo();
      // setTodoData(data.data);
      // console.log(responseData[0].title);
      const loadtodo = [];
      for (const key in responseData.data) {
        loadtodo.push({
          id: responseData.data[key]._id,
          title: responseData.data[key].title,
          body: responseData.data[key].body,
          description: responseData.data[key].description,
          switchTick: responseData.data[key].switchTick,
          selectedFile: responseData.data[key].selectedFile,
        });
      }
      setTodoData(loadtodo);
      setLoading(false);
    };
    getdataApi();
  }, [props.dataChange, dataFormEdit]);
  const dataget = async () => {};
  dataget();
  const todomap = todoData.map((tdata) => (
    <Grid key={tdata.id} item xs={3}>
      <Todo
        key={tdata.id}
        id={tdata.id}
        title={tdata.title}
        body={tdata.body}
        switchTick={tdata.switchTick}
        description={tdata.description}
        selectedFile={tdata.selectedFile}
        setDataFormEdit={setDataFormEdit}
        setDataChange={props.setDataChange}
      />
    </Grid>
  ));
  return (
    <>
      <div className={classes.head}>
        <h2>Welcome to the Todo List</h2>
      </div>
      <FormTodo
        setDataChange={props.setDataChange}
        dataFormEdit={dataFormEdit}
        setDataFormEdit={setDataFormEdit}
        todoData={todoData}
      />
      <div className={classes.conttodo}>
        <Grid className={classes.container} container alignItems="stretch">
          {!todomap.length ? <CircularProgress /> : todomap}
        </Grid>
        {/* <Todo title="Akash" body="hiii Hii Akash" />
        <Todo title="Pooja" body="hiii Hii Bandar" /> */}
        {/* </Container> */}
        {loading && <CircularProgress />}
      </div>
    </>
  );
};
export default TodoLists;
