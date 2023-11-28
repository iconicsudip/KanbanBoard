import React from 'react';
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

export default function RichEditorDesc({desc,setDesc}) {
    return (
            <Editor
                defaultEditorState={desc}
                onEditorStateChange={setDesc}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
    )
}
