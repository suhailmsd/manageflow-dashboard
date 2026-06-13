import React from 'react'

export default function Pagination({currentUserPage,setCurrentUserPage,totalUsers,usersPerPage}) {

const totalPages = Math.ceil(totalUsers / usersPerPage);

  
 function prevPage(){
  setCurrentUserPage(prev => (prev > 1 ? prev - 1 : prev));
}

function nextPage(){
  setCurrentUserPage(prev => (prev < totalPages ? prev + 1 : prev));
}

  return (
    <div className='flex items-center justify-between sm:justify-center gap-3 mt-4 px-2 py-3 bg-slate-800 text-white rounded-lg select-none max-[380px]:justify-none max-[380px]:p-0 max-[380px]:gap-2'>


      <button className={`${totalPages === 1 ? 'hidden' : ''} px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-sm font-medium rounded transition-all`} disabled={currentUserPage === 1} onClick={prevPage} >Left</button>
      <div className='text-sm font-semibold tracking-wide whitespace-nowrap min-w-[100px] text-center'>
        <span className='text-purple-400'>page {currentUserPage} of {totalPages}</span>
        </div>
      <button className={`${totalPages === 1 ? 'hidden' : ''} px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-sm font-medium rounded transition-all`} onClick={nextPage} disabled={currentUserPage === totalPages}>Right</button>
    </div>
  )
}