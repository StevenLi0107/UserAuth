import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "./UploadAdapter";

export default function TextEditor() {
  return (
    <div>
      <CKEditor
        style={{ height: 500 }}
        onReady={(editor) => {
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new UploadAdapter(loader);
          };
        }}
        editor={ClassicEditor}
        onChange={(event, editor) => {
          console.log("editor data ", editor.getData());
          const data = editor.getData();
          // console.log( { event, editor, data } );
          console.log({ data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
}
