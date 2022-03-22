import React, { useState } from 'react'
// import { CKEditor } from 'ckeditor4-react';
import CKEditor from "react-ckeditor-component";

 const Test=()=> {
  
    const [content, setContent] =useState("");

  function   updateContent(newContent) {
        setContent(newContent)
    }
    
    function onChange(evt){
      console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
     setContent(newContent)
    }
    
   function onBlur(evt){
     console.log("onBlur event called with event info: ", evt);
    }
    
  function  afterPaste(evt){
     console.log("afterPaste event called with event info: ", evt);
    }

    

        return (
            <CKEditor 
              activeClass="p10" 
              content={content} 
              events={{
                "blur": onBlur,
                "afterPaste": afterPaste,
                "change": onChange
              }}
             />
        )
    }


export default Test;