"use client";

import React, { useEffect, useState } from "react";
// import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const page = () => {
  const [data, setData] = useState([]);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "recipent",
      headerName: "Recipent",
      //   width: 150,
      flex: 0.8,
      //   editable: true,
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,

      //   width: 150,
      //   editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      //   type: "number",
      width: 110,
      flex: 0.5,
      //   editable: true,
    },
    {
      field: "paid",
      headerName: "Paid",
      sortable: false,
      renderCell: (params) => {
        return (
          <button className="bg-green-600 text-white rounded-lg font-semibold text-sm p-2">
            YES
          </button>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      //   type: "number",
      width: 210,
      //   editable: true,
    },
  ];

  useEffect(() => {
    axios
      .post("/api/Orders", { email: "all" })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  //   const rows = [
  //     {
  //       id: 6,
  //       recipent: "Rishab",
  //       product: "Cat",
  //       amount: "3300",
  //       paid: "Yes",
  //       date: "10/09/2023",
  //     },
  //     // { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //     // { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //     // { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //     // { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //     // { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   ];
  const [rows, setRows] = useState([
    // {
    //   id: 0,
    //   recipent: "Rishab",
    //   product: "Cat",
    //   amount: "3300",
    //   paid: "Yes",
    //   date: "10/09/2023",
    // },
  ]);

  useEffect(() => {
    // setRows(data);
    let id = 1;
    data.forEach((eachData) => {
      setRows((row) => [
        ...row,
        {
          id: id++,
          recipent: eachData.email,
          product: eachData.title,
          amount: "₹" + eachData.price + ".00",
          paid: "Yes",
          date: eachData.date,
          //   id: admin.data().email,
          //   name: admin.data().name,
        },
      ]);
    });
  }, [data]);

  return (
    <div>
      <div className="bg-gray-100 overflow-x-scroll  p-5 min-h-[80vh]">
        <div className="text-2xl font-bold py-10 text-center">Orders</div>
        <div className="min-w-[1400px]">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            sx={{
              display: "flex",
              //   fontSize: "2rem",
              backgroundColor: "white",
              borderRadius: "1.5rem",
              color: "black",
              minWidth: 150,
            }}
            pageSizeOptions={[15]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default page;
