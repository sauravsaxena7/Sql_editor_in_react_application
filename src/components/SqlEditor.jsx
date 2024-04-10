import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import OpenForAllPopUp from "../utils/OpenForAllPopup";
import Button from "@mui/material/Button";
import Select from "react-select";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
    CreateNewDatabase,
  GetAllDatabase,
  GetQueryExecutionData,
} from "../redux/actions/QueryAction";
import InputTextPopUp from "../utils/InputTextPopUp";
const SqlEditor = () => {
  const [sqlText, setSqlText] = useState("");
  const [currentDatabase, setCurrentDatabase] = useState({
    label: "flask_tutorial",
    value: "flask_tutorial",
  });
  const editorRef = useRef();

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  const queryReducerr = useSelector((state) => state?.QueryReducer);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    message: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    formType: "form",
  });
  const [Compnent, setComponent] = useState(null);
  const payloadChangeHandler = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(GetAllDatabase());
  }, []);

  const indexChangeHandler = async (e, popUpPayload, closeRef) => {
    console.log("popUpPayload",popUpPayload)
    if(popUpPayload?.case==="NEW_DATABASE"){
        if(!popUpPayload?.value || !popUpPayload?.value===""){
            alert('Please enter database name.')
            return;
        }else{
            const res=await dispatch(CreateNewDatabase({database:popUpPayload?.value}))
            if(res?.error?.error_message===""){
                alert(res?.message)
                closeRef?.current?.click(); 
            }else{
                alert(res?.error?.error_message) 
            }
            
        }
    }
    await dispatch(GetAllDatabase())
  };

  function handleEditorChange(value) {
    setSqlText(value);
  }
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    console.log("lola queryReducerr", queryReducerr);
    if (
      queryReducerr?.queryExecutionData?.error?.error_message === "" &&
      queryReducerr?.queryExecutionData?.result?.length > 0
    ) {
      const arr = [];
      for (const [key, value] of Object.entries(
        queryReducerr?.queryExecutionData?.result[0]
      )) {
        arr.push({ id: key, label: key });
        console.log(`${key}: ${value}`);
      }
      setColumns([...arr]);
    }
  }, [queryReducerr]);

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-4 col-12 m-2">
            <Button
              style={{
                backgroundColor: "#0eb196",
              }}
              onClick={() => {
                dispatch(
                  GetQueryExecutionData({
                    query: sqlText,
                    database: currentDatabase?.value,
                  })
                );
              }}
              variant="contained"
            >
              Execute
            </Button>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-12 m-2">
            <Select
              value={currentDatabase}
              name="colors"
              placeholder={"Select Database"}
              isClearable={true}
              options={queryReducerr?.getAllDatabase?.map((ele) => {
                return {
                  label: ele?.Database,
                  value: ele?.Database,
                };
              })}
              onChange={(ele) => {
                setCurrentDatabase(ele);
              }}
              className="basic-multi-select input-border"
              classNamePrefix="select"
              //   blurInputOnSelect={false}
              //   closeMenuOnSelect={false}
            />
          </div>
          <div className="col-xl-2 col-lg-2 col-md-4 col-12 m-2">
            <Button
              data-bs-toggle="modal"
              data-bs-target="#openForAll"
              onClick={() => {
                setComponent(() => InputTextPopUp);
                setPayload({
                  ...payload,
                  message: "Create New Database.",
                  formType: "none",
                  case: "NEW_DATABASE",
                  value:"",
                });
              }}
              variant="contained"
            >
              New Database
            </Button>
          </div>
        </div>

        <div className="border-tr m-2">
          <Editor
            height="50vh"
            width="100%"
            theme="vs-light"
            onMount={handleEditorDidMount}
            path={"index.sql"}
            defaultLanguage={"sql"}
            //   defaultValue={""}
            onChange={handleEditorChange}
            value={sqlText}
          />
        </div>

        <div className="mt-10 m-5">
          {queryReducerr?.queryExecutionData?.error?.error_message === "" ? (
            <div>
              {queryReducerr?.queryExecutionData?.result?.length > 0 ? (
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                            //   style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {queryReducerr?.queryExecutionData?.result //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          ?.map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}
                              >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      <div>
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </div>
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              ) : (
                "No Data"
              )}
            </div>
          ) : (
           <div><p style={{color:"red"}}> {queryReducerr?.queryExecutionData?.error?.error_message}</p></div>
          )}
        </div>
      </div>

      <OpenForAllPopUp
        indexChangeHandler={indexChangeHandler}
        Compnent={Compnent}
        payload={payload}
        payloadChangeHandler={payloadChangeHandler}
        setCompnent={setComponent}
      />
    </div>
  );
};

export default SqlEditor;
