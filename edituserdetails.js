import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Table, Form, Button, Input, Header, Label, Container } from "semantic-ui-react";
export default function EdituserInfo() {
  const params = useParams();
  const [userInfo, setUserInfo] = useState({});
  const navigate=useNavigate()
  useEffect(() => {
    console.log(params.id);
    axios.get("/upload").then((res) => {
      console.log(res.data);
      setUserInfo({
        ...res.data.find((val) => {
          if (val.id == params.id) return val;
        }),
      });
    });
  }, []);
  var {firstname,lastname,username,password,email,image}=userInfo
  const validateData = () => {
    var name = /^[a-z ,.'-]+$/i;
    var emailTest =
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
   
    if (
      firstname === "" ||
      lastname === "" ||
      username === "" ||
      password === "" ||
      email === ""
    ) {
      alert("fields cannot be empty");
    } else if (firstname.length < 3 || firstname > 15 || !firstname.match(name)) {
      alert("faname");
    } else if (lastname.length < 3 || lastname > 15 || !lastname.match(name)) {
      alert("lname");
    } else if (strongRegex.test(password) === false) {
      alert("password");
    } else if (username.length < 5 || username.length > 15) {
      alert("username");
    } else if (!email.match(emailTest)) {
      alert("email");
    } else {
      let formData=new FormData()
        formData.append('fname',userInfo.firstname)
        formData.append('lname',userInfo.lastname)
        formData.append('username',userInfo.username)
        formData.append('password',userInfo.password)
        formData.append('email',userInfo.email)
        formData.append('img',userInfo.image[0])
        fetch(`/upload/${userInfo.id}`,{
          method:"PATCH",
          headers:{
            // 'Content-Type':'application/json'
          },
          body:formData
        }).then((res)=>res.json())
        navigate('/')
    }
  };
  const get=()=>{
    console.log(userInfo)
  }
  return (
    <>
      <Form
        style={{
          backgroundColor: "antiquewhite",
          padding: "90px",
          borderRadius: "15px",
          marginTop: "10px",
        }}
      >
        <Header style={{ fontSize: "40px" }}>User Details</Header>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First Name"
            placeholder="first name"
            value={firstname}
            onChange={(e) => {setUserInfo({...userInfo,firstname:e.target.value})}}
          />
          <Form.Input
            fluid
            label="Last Name"
            placeholder="last name"
            value={lastname}
            onChange={(e) => {setUserInfo({...userInfo,lastname:e.target.value})}}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Username"
            placeholder="username"
            value={username}
            onChange={(e) => {setUserInfo({...userInfo,username:e.target.value})}}
          />
          <Form.Input
            fluid
            label="Password"
            placeholder="password"
            value={password}
            onChange={(e) => { setUserInfo({...userInfo,password:e.target.value})}}
          />
          <Form.Input
            fluid
            label="E-mail"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setUserInfo({...userInfo,email:e.target.value})
            }}
          />
        </Form.Group>
        <Form.Group>
        {/* <Form.Input
            fluid
            label="E-mail"
            placeholder="email"
            value={image}
            style={{width:"10rem"}}
          /> */}
          <Container>
            <img style={{width:"220px",height:"70px"}} src={`http://localhost:8080/userimages/${image}`}/>
            <input type="file" style={{width:"190px"}} onChange={(e)=>{
              setUserInfo({...userInfo,image:e.target.files})
            }}/>
          </Container>
        </Form.Group>
        <Form.Group>
          <Form.Button primary onClick={() => validateData()}>
            Submit
          </Form.Button>
          <Form.Button
            secondary
            onClick={() => {
              get()
            }}
          >
            Cancel
          </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
}
