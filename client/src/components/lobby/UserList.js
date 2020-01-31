import React from 'react'
import { Loader } from '../Loader'


export const UserList = () => {

   // useEffect(()=> {
   //    document.getElementById('y-scroll-2').lastChild.scrollIntoView(true)
   // }, [usrList])

   return (
      <div className="row">
         <div className="col s12">
            <h1 className="font-fam-mainheader center-align cyan-text text-darken-2">Players</h1>
            <div className="divider grey accent-3"></div>
            <div id='y-scroll-2' className="y-scroll" style={{ height: '400px' }}>
               {/* {msgList.length ? <Messages messages={msgList} /> : <Loader size={'big'} />} */}
               <Loader size={'big'} />
               <h3>search</h3>
         <h3>players </h3>
         <h3>  statuses - ready/waiting/away/playing/offline</h3>
         <h3>offer a game button</h3>
            </div>
            <div className="divider grey accent-3"></div>
         </div>
      </div>
   )
}

//TODO use className='pulse'