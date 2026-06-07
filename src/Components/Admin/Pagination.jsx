import React from 'react'

export default function Pagination({currentUserPage,setCurrentUserPage,totalUsers,usersPerPage}) {

  
  
    function prevPage(){
    if(currentUserPage > 0){
      setCurrentUserPage(prev => prev - 1)
    }
  }

  const totalPages = Math.ceil(totalUsers / usersPerPage);
  
  
  function nextPage(){
    if(currentUserPage < totalPages - 1){
      setCurrentUserPage(prev => prev + 1)
    }
  }

  return (
    <div className='flex items-center justify-between sm:justify-center gap-3 mt-4 px-2 py-3 bg-slate-800 text-white rounded-lg select-none'>


      <button className='px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-sm font-medium rounded transition-all' onClick={prevPage} disabled={currentUserPage === totalPages - -1}>Left</button>
      <div className='text-sm font-semibold tracking-wide whitespace-nowrap min-w-[100px] text-center'>
        <span className='text-purple-400'>page {currentUserPage + 1} of {totalPages}</span>
        </div>
      <button className='px-3 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-sm font-medium rounded transition-all' onClick={nextPage} disabled={currentUserPage === totalPages - 1}>Right</button>
    </div>
  )
}
