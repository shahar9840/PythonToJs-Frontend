
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import 'monaco-editor/esm/vs/editor/editor.worker.js';
import "monaco-editor/esm/vs/basic-languages/python/python.contribution"; 






function PythonBox({code,deleteCodeBlock,setCode,id,fetchCodeBlock,createCodeBlock,updateCode,token}) {
    
    const editorRef = React.useRef(null);
    
    React.useEffect(()=>{
        if(id){

            fetchCodeBlock(id)
        }
    },[id,token])

    const handleEditorContentChange = () => {
        const newCode = editorRef.current?.getValue();
        setCode(newCode)
        
        
        
    }
    React.useEffect(() => {
        if (editorRef.current && id ) {
          editorRef.current.onDidChangeModelContent(handleEditorContentChange);
        }
      }, [id]);

  




  return (
    <div><div className='border'>
        <div> <h3 className='text-center'>     Enter Code Here   </h3></div>
     
      <div><MonacoEditor
        height='60vh'
        language='python'
        value={code}
        theme='vs-dark'
        editorDidMount={(editor) => (editorRef.current = editor)}
        options={{ paddingTop:  '7%'  }}
        
      /></div>
      
    </div>
    <div className='flex-buttons '><button onClick={createCodeBlock}>Create New </button><button onClick={deleteCodeBlock} className='delete-button'>Delete Block</button><button onClick={updateCode}>Convert</button></div>
    </div>
  );
}

export default PythonBox;
