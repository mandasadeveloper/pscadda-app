import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorContent = (props) => {
  const [editorState, setEditorState] = useState(props.content);
  useEffect(() => {
    console.log("loaded number " + props.id);
  });
  const editorId = props.id;
  return (
    <div className="editor">
      <Editor
        //Update and show text box content
        editorState={editorState}
        onEditorStateChange={(editorState) => {
          let html = stateToHTML(editorState.getCurrentContent());
          console.log(html);
          props.setContent(editorId, html, editorState);
          setEditorState(editorState);
        }}
        //Display toolbar on top
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true }
        }}
      />
    </div>
  );
};

//React state hook
function TextEditor(props) {
  //Declaration of editorList array and setList setter
  const [editorList, setEditorList] = useState([
    { id: 0, html: "", content: EditorState.createEmpty() },
    { id: 1, html: "", content: EditorState.createEmpty() },
    { id: 2, html: "", content: EditorState.createEmpty() },
    { id: 3, html: "", content: EditorState.createEmpty() },
  ]);

  const setEditorContent = (id, html, editorState) => {
    console.log(id, html);
    // deep copy array
    let editorsCopy = [];
    for (let editor of editorList) {
      editorsCopy.push(editor);
    }
    const index = editorsCopy.findIndex((editor) => {
      return editor.id === id;
    });
    editorsCopy[index].html = html;
    editorsCopy[index].content = editorState;

    setEditorList(editorsCopy);
  };
  return (
    <form className="App" autoComplete="off">
      <div className="form-field">
        {editorList.map((editor, index) => (
          <div key={index} className="services">
            <div className="first-division">
              <EditorContent id={editor.id} setContent={setEditorContent} />
            </div>
           
          </div>
        ))}
      </div>
    </form>
  );
}

export  {TextEditor}
