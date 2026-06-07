
export default function NavButton({buttonIcon, buttonName}) {
  return (
        <button className={`flex items-center gap-3 m-2 bg-blue-500 hover:bg-blue-600 text-gray-900 font-semibold dark:bg-blue-600 dark:text-slate-100 dark:hover:text-white dark:hover:bg-blue-500 w-full p-2 rounded-md group transition duration-100 mx-auto max-[500px]:text-sm ${({isActive}) => ( isActive ?'bg-red-500' : '')}`}>
            <div className="group-hover:translate-x-1 transition duration-300">{buttonIcon}</div>
            <span className="">{buttonName}</span>
        </button>
  )
}
