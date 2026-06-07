import UserTable from './UserTable'

export default function AdminDashboardDetails() {

  const cardStyle = 'bg-slate-100 text-gray-900 p-4 rounded-md text-center w-48 max-[500px]:w-full max-md:w-[40%] max-lg:w-[50%]'

  return (
    <main className="w-full p-4 mx-auto mt-10">
      <div className="flex gap-2 max-[500px]:flex-wrap max-md:flex-wrap justify-center" >
       <div className={cardStyle}>
          <h1>Hello</h1>
          <p>ppppppppp</p>
        </div>
         <div className={cardStyle}>
          <h1>Hello</h1>
          <p>ppppppppp</p>
        </div>
         <div className={cardStyle}>
          <h1>Hello</h1>
          <p>ppppppppp</p>
        </div>
         <div className={cardStyle}>
          <h1>Hello</h1>
          <p>ppppppppp</p>
        </div>

        </div>
        
    </main>
  )
}
