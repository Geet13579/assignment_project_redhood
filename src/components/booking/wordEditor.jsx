'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
);

const WysiwygComponent = ({onContentChange}) => {
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const onEditorStateChange = (newEditorState) => {
        const rawContent = convertToRaw(newEditorState.getCurrentContent());
        const htmlContent = draftToHtml(rawContent);
        // setEditorState({htmlContent});


        // // console.log('htmlContent', htmlContent)
        onContentChange(htmlContent)
       
    };


    return (
        <>
            <Editor
                // editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorStyle={{ padding: "20px" }}
                onEditorStateChange={onEditorStateChange}
            
            />
     
        </>
    );
};

export default WysiwygComponent;
