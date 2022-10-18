import React, { useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
export default function ImageUpload() {
  const [user, setUser] = useState({ image: "" });

  const handleUpload = (e) => {
    
    let formData=new FormData()
    formData.append("img",e.target.files[0])

    fetch("/upload", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      body: formData 
    }).then((res) => {
      return res.json();
    });
  };
  const setImagePath = e => {
    let res=e.target.files
    let reader = new FileReader()
    reader.readAsDataURL(res[0])
    reader.onload = (e) => {
     setUser({image:e.target.result})
   }
  }
  return (  
    <>
        <input
          type="file"
          // value={}
          onChange={(e) => {
            handleUpload(e)
          }}
        />
        <button>Try</button>
   
    </>
  );
}
