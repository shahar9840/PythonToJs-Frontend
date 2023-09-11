
import React, { useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/default.css'; 
import 'highlight.js/styles/base16/3024.css';// Import the desired highlight.js style

import 'highlight.js/lib/languages/javascript'; // Import the JavaScript language for highlighting

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

function JavaScriptBox({jsCode,id}) {
  const codeRef = useRef(null); // Create a ref to the code block element
  
    

  React.useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [id,jsCode]);

  ;

  return (
    <div className='border'>
      <pre style={{margin:'0'}}>
        <h3 className='text-center'>JavaScript Code</h3>
        <code ref={codeRef} className="javascript">
          {jsCode}
        </code>
      </pre>
    </div>
  );
}

export default JavaScriptBox;
