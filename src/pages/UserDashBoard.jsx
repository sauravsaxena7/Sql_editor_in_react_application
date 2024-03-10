// import React from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers, GetSingleUserById } from "../redux/actions/UserAction";
import PaginatedItems from "../utils/Pagination";
import { Button } from "@mui/material";
import UserForm from "../components/UserForm";

const UserDashBoard = ({
  payload,
  setPayload,
  indexChangeHandler,
  payloadChangeHandler,
  Compnent,
  setComponent,
  users
}) => {
  const columns = [
    { id: "id", label: "Id", minWidth: 70 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "phone", label: "Phone", minWidth: 100 },
    { id: "role", label: "Role", minWidth: 100 },
    { id: "UserCreatedAt", label: "UserCreatedAt", minWidth: 200 },
    {
      id: "edit",
      label: "Edit",
      minWidth: 100,
      type: "action",
      icon: "create-outline",
      color: "primary",
    },
    {
      id: "delete",
      label: "Delete",
      minWidth: 100,
      type: "action",
      icon: "trash-outline",
      color: "error",
    },
  ];

  const userReducerr = useSelector((state) => state?.UserReducer);
  const dispatch = useDispatch();
 

  return (
    <div className="mt-10 m-5">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column?.type !== "action" ? (
                              <div>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </div>
                            ) : (
                              <Button
                                variant="contained"
                                color={column?.color}
                                data-bs-toggle="modal"
                                data-bs-target="#openForAll"
                                onClick={() => {
                                  if (column?.color === "error") {
                                    setComponent(() => null);
                                    setPayload({
                                      ...payload,
                                      message: "Delete User.",
                                      formType: "none",
                                      case: "DELETE_USER",
                                      id: row?.id,
                                    });
                                  } else {
                                    dispatch(GetSingleUserById(row.id));
                                    setComponent(() => UserForm);
                                    setPayload({
                                      ...payload,
                                      message: "Edit User.",
                                      formType: "form",
                                      case: "UPDATE_USER",
                                    });
                                  }
                                }}
                              >
                                <ion-icon name={column?.icon}></ion-icon>
                              </Button>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="mt-2"></div>
        {userReducerr?.getAllUsers?.length !== 0 && (
          <PaginatedItems totalCount={userReducerr?.totalCount} />
        )}
      </Paper>
    </div>
  );
};

export default UserDashBoard;
