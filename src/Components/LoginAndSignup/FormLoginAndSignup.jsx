

export default function FormRegisterAndLogin({buttonTitle,mode}) {

  return (
            <div className="w-full max-w-md p-4 text-center sm:w-full">
            <form action="" className="space-y-6 py-4 px-2 max-sm:px-0">
                <div className="input-group flex flex-col text-left w-full">
                    <label htmlFor="email" className="mb-1 text-gray-600">Email</label>
                    <input type="email" id="email" placeholder="name@example.com" className="p-2 rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 hover:ring-2 hover:ring-cyan-200 required"/>
                </div>
                <div className="input-group flex flex-col text-left w-full">
                    <label htmlFor="password" className="mb-1 text-gray-600">Password</label>
                    <input type="password" id="password"  placeholder="******"  className="p-2 rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 hover:ring-2 hover:ring-cyan-200 required"/>
                </div>
                {mode === 'register' && <div className="input-group flex flex-col text-left w-full">
                    <label htmlFor="password" className="mb-1 text-gray-600"> Confirm Password</label>
                    <input type="password" id="password"  placeholder="******"  className="p-2 rounded-md font-sans outline-none focus:ring-2 focus:ring-indigo-300 border border-gray-500 hover:ring-2 hover:ring-cyan-200 required"/>
                </div>}
                <button className="bg-blue-500 w-full py-3 rounded-lg hover:bg-blue-600 shadow-sm hover:shadow text-white font-semibold transition-all duration-200">{buttonTitle}</button>

            </form>
        </div>
  )
}
