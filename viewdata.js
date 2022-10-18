import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Table, Input } from "semantic-ui-react";
export default function Viewdata() {
  const [data, setData] = useState([]);
  const [cloneData, setCloneData] = useState({});
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:8080").then((res) => {
      setData([
        ...res.data.map((val) => {
          return { ...val, edit: false };
        }),
      ]);
    });
    console.log("cvgdsv");
  }, [count]);
  const deleteTableRow = (index) => {
    fetch(`http://localhost:8080/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }).then(function (response) {
      return response.json();
    });
  };
  const editRow = (index) => {
    let clone = data[index];
    let cloneData = data;
    cloneData[index].edit = true;
    setData([...cloneData]);
    setCloneData({ ...clone });
  };
  const updateRow = (index, id) => {
    let clone = data;
    clone[index].edit = false;
    setData([...clone]);
    fetch(`http://localhost:8080/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cloneData),
    }).then(function (response) {
      return response.json();
    });
    console.log(cloneData);
  };
  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>ShipmentId</Table.HeaderCell>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data &&
            data.map((val, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{val.id}</Table.Cell>
                  {!val.edit ? (
                    <Table.Cell>{val.shipmentid}</Table.Cell>
                  ) : (
                    <Table.Cell>
                      <Input
                        value={cloneData.shipmentid}
                        onChange={(e) => {
                          setCloneData({
                            ...cloneData,
                            shipmentid: e.target.value,
                          });
                        }}
                      />
                    </Table.Cell>
                  )}
                  {!val.edit ? (
                    <Table.Cell>{val.customername}</Table.Cell>
                  ) : (
                    <Table.Cell>
                      <Input
                        value={cloneData.customername}
                        onChange={(e) => {
                          setCloneData({
                            ...cloneData,
                            customername: e.target.value,
                          });
                        }}
                      />
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    {!val.edit ? (
                      <Button
                        secondary
                        onClick={() => {
                          editRow(index);
                        }}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        secondary
                        onClick={() => {
                          updateRow(index, val.id);
                          setCount(count + 1);
                        }}
                      >
                        Update
                      </Button>
                    )}
                    <Button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => {
                        deleteTableRow(val.id);
                        setCount(count + 1);
                      }}
                    >
                      DELETE
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </>
  );
}
