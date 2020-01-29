import React from 'react'

export const Loader = ({size = ''}) => (
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', height: '100%' }}>
      <div className={"preloader-wrapper active "+`${size}`}>
         <div className="spinner-layer spinner-blue">
            <div className="circle-clipper left">
               <div className="circle"></div>
            </div>
            <div className="gap-patch">
               <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
               <div className="circle"></div>
            </div>
         </div>

         <div className="spinner-layer spinner-red">
            <div className="circle-clipper left">
               <div className="circle"></div>
            </div>
            <div className="gap-patch">
               <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
               <div className="circle"></div>
            </div>
         </div>

         <div className="spinner-layer spinner-yellow">
            <div className="circle-clipper left">
               <div className="circle"></div>
            </div>
            <div className="gap-patch">
               <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
               <div className="circle"></div>
            </div>
         </div>

         <div className="spinner-layer spinner-green">
            <div className="circle-clipper left">
               <div className="circle"></div>
            </div>
            <div className="gap-patch">
               <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
               <div className="circle"></div>
            </div>
         </div>
      </div>
   </div>
)
