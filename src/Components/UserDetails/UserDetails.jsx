import UserTable from './UserTable'

export default function UserDetails() {

  const cardStyle = 'bg-slate-100 text-gray-900 p-4 rounded-md text-center w-48 max-[500px]:w-full'

  return (
    <main className="w-[95%] mx-auto mt-10">
      <div className="flex gap-2 max-[500px]:flex-wrap">
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

          <UserTable />
        
    </main>
  )
}
