import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Table,Form,Button, Input,Header, Label } from 'semantic-ui-react';
export default function Myapp() {
  let navigate  = useNavigate()
    const[userData,setUserData]=useState({fname:"",
lname:"",
username:"",
password:"",
email:"",
image:""
})
const str="hello"
const validateData=()=>{
    var name=/^[a-z ,.'-]+$/i
    var emailTest=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
   let {fname,lname,username,password,email,image}=userData
    if(fname===""||lname===""||username===""||password===""||email===""||image==="")
    {
        alert("fields cannot be empty")
    }
    else if(fname.length<3||fname>15||!fname.match(name))
    {
        alert("faname")
    }
    else if(lname.length<3||lname>15||!lname.match(name))
    {
        alert("lname")
    }
    else if(strongRegex.test(password)===false)
    {
        alert("password")
    }
    else if(username.length<5||username.length>15)
    {
        alert("username")
    }
    else if(!email.match(emailTest))
    {
        alert("email")
    }
    else {
        let formData=new FormData()
        formData.append('fname',userData.fname)
        formData.append('lname',userData.lname)
        formData.append('username',userData.username)
        formData.append('password',userData.password)
        formData.append('email',userData.email)
        formData.append('img',userData.image[0])
        fetch("/upload",{
            method:"POST",
            headers:{
                // 'Content-Type':'application/json'
            },
            body:formData
        }).then((res)=>{
          res.json()
          navigate("/")
        
     }
        )
    }
}

  return (
    <>
     <Form style={{backgroundColor:"antiquewhite",padding:"90px",borderRadius:"15px",marginTop:"10px"}}>
        <Header style={{fontSize:"40px"}}>User Details</Header>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First Name"
            placeholder="first name"
            value={userData.fname}
            onChange={(e) => {
              setUserData({...userData, fname: e.target.value });
            }}
          />
          <Form.Input
            fluid
            label="Last Name"
            placeholder="last name"
            value={userData.lname}
            onChange={(e) => {
              setUserData({ ...userData,lname: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Username"
            placeholder="username"
            value={userData.username}
            onChange={(e) => {
            setUserData({...userData,username: e.target.value });
            }}
          />
          <Form.Input
            fluid
            label="Password"
            placeholder="password"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData,password: e.target.value });
            }}
          />
            <Form.Input
            fluid
            label="E-mail"
            placeholder="email"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData,email: e.target.value });
            }}
          />
          </Form.Group>
          <Form.Group>
          <Label>Image</Label>  
          <input type='file'
          style={{width:"25%"}}
            label="image"
            onChange={(e) => {
              setUserData({ ...userData,image: e.target.files});
            }}
          />
        </Form.Group>
        <Form.Group>
        <Form.Button
        primary
          onClick={() => {
            validateData()
          }}
        >
          Submit
        </Form.Button>
        <Form.Button
       secondary
          onClick={() => {
          setUserData({fname:"",lname:"",username:"",password:"",email:"",image:""})
          }}
        >
          Cancel
        </Form.Button>
        </Form.Group>
      </Form>
    </>
  )
}
