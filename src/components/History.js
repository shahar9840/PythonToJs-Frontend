
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'


function History({id,name,handelHistory,histories,setIsHistoryOpen,isHistoryOpen}) {

   React.useEffect(()=>{
    handelHistory()
   },[])
    
    
  return (
    <div  className={`history floating-history ${isHistoryOpen ? 'open' : ''}`}>
     <div onClick={()=>{
                setIsHistoryOpen(false)
               }}  className='x-button' >X</div> <div> <h3 className='text-center ' >History</h3>
       {
            histories.slice().reverse().map((history)=>(
               <Link  key={history.id} className='link-css' to={`/code/${history.id}`} onClick={()=>{
                setIsHistoryOpen(false)
               }} >
                {history.python_code !== '' && history.python_code !== undefined ? history.python_code.split('\n')[0] : `Empty Code Block`}

                </Link>
            ))
        }
        
        </div>
    </div>
  )
}

export default History

