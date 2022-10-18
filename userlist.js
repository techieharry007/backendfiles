import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import EditUserData from "./edituserdetails";

export default function Userlist() {
  const navigate = useNavigate();
  const[count,setCount]=useState(0)
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/upload").then((res) => {
      // console.log(res.data);
      setUsers([...res.data]);
    });
  },[count]);

  const handleDeletion=(id)=>{
    fetch(`/upload/${id}`,{
      method:"DELETE",
    }).then((res)=>res.json())
  }    

  return (
    <>
      <Button
        primary
        onClick={() => {
          navigate("/adduser");
        }}
      >
        Create Profile
      </Button>

      {
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>User Name</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Images</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users &&
              users.map((res, index) => {
                // var b64encoded = window.btoa(String.fromCharCode.apply(null,res.image.data));
                // var datajpg = "data:image/png;base64," + b64encoded;
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{res.id}</Table.Cell>
                    <Table.Cell>{res.username}</Table.Cell>
                    <Table.Cell>{res.firstname}</Table.Cell>
                    <Table.Cell>{res.lastname}</Table.Cell>
                    <Table.Cell>{<img style={{width:"150px",height:"50px"}}  
                    src={`http://localhost:8080/userimages/${res.image}`}/>}</Table.Cell>  
                   
                    <Table.Cell style={{width:"180px"}}>
                      <Button primary style={{width:"150px"}} onClick={()=>{
                        navigate(`/edituserdata/${res.id}`)
                      }}>Edit</Button>
                    </Table.Cell>
                    <Table.Cell style={{width:"180px"}}>
                      <Button style={{width:"150px",background:"red",color:"white"}}
                      onClick={()=>{
                        handleDeletion(res.id)
                        setCount(count+1)
                      }}
                      >Delete</Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      }
    </>
  );
}
