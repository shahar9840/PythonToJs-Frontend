import React from "react";
import History from "./components/History";
import JavaScriptBox from "./components/JsBox";
import PythonBox from "./components/PythonBox";
import Login from "./components/Login";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function Main({code,setCode,refreshToken,checkAuth,name,handelHistory,token,histories,navigate}) {
  
  const params = useParams();
  
  const [jsCode, setJsCode] = React.useState("");
 



 

  const fetchCodeBlock = (id) => {
    try {
      axios
        .get(`https://convertor-back.politeriver-e73a6e59.westeurope.azurecontainerapps.io/history/${id}`,{headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
          setCode(response.data[0].python_code);
          
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.log(`Code block with id ${id} not found.`);
            alert('Created new Code Block , See below at history Panel :)')
            createCodeBlock()
            
          } else {
            console.error("Error fetching code block:", error);
          }
        });
    } catch (error) {
      console.error("Error fetching code block:", error);
    }
  };
//   React.useEffect(() => {
//     if (params.id) {
//       fetchCodeBlock(params.id);
//     }
//   }, [params.id]);

  const createCodeBlock = () => {
    axios
      .post(`https://convertor-back.politeriver-e73a6e59.westeurope.azurecontainerapps.io/history`, {python_code: "" ,user_name :localStorage.getItem('name') },{headers: {Authorization: `Bearer ${token}`}})
      .then((response) => {
        console.log("Code Block created:", response.data["message"]);
        navigate(`/code/${response.data["id"]}`);
        handelHistory()
      })
      .catch((error) => {
        console.error("Error creating code block:", error);
      });
  };
  const deleteCodeBlock = () => {
    axios
      .delete(`https://convertor-back.politeriver-e73a6e59.westeurope.azurecontainerapps.io/history/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {}, // Add an empty data object to simulate a JSON request.
      })
      .then((response) => {
        console.log(response.data.message);
        handelHistory();
      })
      .catch((error) => {
        console.error("Error deleting code block:", error);
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
      });
  };
  function updateCode() {
    
    if (params.id !== undefined) {
      axios
        .put(`https://convertor-back.politeriver-e73a6e59.westeurope.azurecontainerapps.io/history/${params.id}`, {
          id: params.id,
          python_code: code,
        },
        { headers: { Authorization: `Bearer ${token}` }})
        .then((response) => {
          try {
            
            if (response.data.convert === undefined) {
              setCode('Enter Valid Code In Python ! ');
              handelHistory();
            } else {
              setJsCode(response.data.convert);
              handelHistory();
            }
          } catch (error) {
            // Handle the error gracefully
            console.error("Error processing response data", error);
            alert("Input provided by the user was incorrect.");
          }
        })
        .catch((error) => {
          // Handle network errors or other issues
          console.error("Error updating code", error);
          console.error("Response data:", error.response ? error.response.data : null);
          console.error("Status code:", error.response ? error.response.status : null);
        });
    }
  }

 
   
  return (
    <div>
      
      
      <div className="theme">
        <div>
          <History id={params.id} name={name} histories={histories} handelHistory={handelHistory} />
        </div>
        <div>
          <PythonBox
            token={token}
            key={params.id}
            code={code}
            setCode={setCode}
            deleteCodeBlock={deleteCodeBlock}
            id={params.id}
            fetchCodeBlock={fetchCodeBlock}
            createCodeBlock={createCodeBlock}
            updateCode={updateCode}
          />
        </div>
        <div>
          <JavaScriptBox jsCode={jsCode} setJsCode={setJsCode} id={params.id} />
        </div>
      </div>
    </div>
  );
}

export default Main;
