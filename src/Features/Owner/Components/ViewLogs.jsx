import React from 'react'
import { getLogs } from '../ownerService'

export default function ViewLogs() {

  const {getLogsData,logsLoading} = getLogs();


  return (
    <>
      <div className='p-2 lg:flex lg:justify-center mt-5'>
        <div className='bg-slate-300 dark:bg-gray-700 rounded mt-3 p-1 lg:w-[800px] lg:p-4  max-[500px]:max-w-[350px] max-[400px]:max-w-[260px] max-[500px]:overflow-auto'>
          <h1 className='text-md text-black font-bold dark:text-slate-100  sm:text-lg lg:text-2xl'>Activity Logs</h1>
          <div className=' p-2 mt-5 bg-[#000] text-[#00ff00] min-h-[200px] rounded text-sm min-w-[200px] max-[500px]:overflow-scroll'>
            <table className='w-full text-left'>
              <thead className='sm:text-md lg:text-xl text-left'>
                <tr>
                  <th className='max-[500px]:px-6 px-4'>Time</th>
                  <th className='max-[500px]:px-6 px-4'>Action</th>
                  <th className='max-[500px]:px-6 px-4'>User</th>
                  <th className='max-[500px]:px-6 px-4'>By</th>
                </tr>
              </thead>
              <tbody className='text-xs sm:text-sm lg:text-md'>
                {logsLoading ? <tr><td>Loading<span className='animate-pulse text-2xl'>...</span></td></tr> 
                : (getLogsData && getLogsData.length > 0 ? 
                (getLogsData.map((log) => (
                  <tr key={log.id} >
                    <td className='max-[500px]:py-2 py-1'>{log.timestamp?.toDate().toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})}</td>
                    <td>{log.action}</td>
                    <td>{log.targetUsername}</td>
                    <td>{`${log.performedByUsername || ''} ${log.performedBy ? `(${log.performedBy})` : ''}`}</td>
                  </tr>
                )))
                : 'no users data'
                )}
              </tbody>
            </table>    
          </div>
        </div>
      </div>
    </>
  )
}
