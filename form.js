import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
export default function UserForm() {
  const navigate=useNavigate()
  const [userData, setUserData] = useState({
    shipmentId: "",
    customerName:"",
    PO:"",
    billOfLading:"",
    container:""
  });
 
  const addUser = () => {
    setTimeout(() => {
      console.log(userData)
      setUserData({shipmentId: "",
      customerName:"",
      PO:"",
      billOfLading:"",
      container:""})
    }, 1000);
  };
  const handleSubmit = () => {
    fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          //  'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userData)
      }).then(function(response) {
        return response.json();
      });
}

  return (
    <>
      <Form style={{backgroundColor:"antiquewhite",padding:"90px",borderRadius:"15px",marginTop:"10px"}}>
        <Header style={{fontSize:"40px"}}>Charged Details</Header>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Shipment Id"
            placeholder="Shipment Id"
            value={userData.shipmentId}
            onChange={(e) => {
              setUserData({...userData, shipmentId: e.target.value });
            }}
          />
          <Form.Input
            fluid
            label="Customer Name"
            placeholder="customer name"
            value={userData.customerName}
            onChange={(e) => {
              setUserData({ ...userData, customerName: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="PO"
            placeholder="PO"
            value={userData.PO}
            onChange={(e) => {
            setUserData({...userData, PO: e.target.value });
            }}
          />
          <Form.Input
            fluid
            label="Bill Of Lading"
            placeholder="BOL"
            value={userData.billOfLading}
            onChange={(e) => {
              setUserData({ ...userData, billOfLading: e.target.value });
            }}
          />
            <Form.Input
            fluid
            label="Container"
            placeholder="container"
            value={userData.container}
            onChange={(e) => {
              setUserData({ ...userData, container: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group>
        <Form.Button
        primary
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Form.Button>
        <Form.Button
       secondary
          onClick={() => {
            navigate('/view')
          }}
        >
          Get
        </Form.Button>
        <Form.Button
       secondary
          onClick={() => {
            navigate('/user')
          }}
        >
          Upload
        </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
}
