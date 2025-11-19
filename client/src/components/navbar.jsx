import { TicketPlus } from 'lucide-react'
import { Link, useNavigate,  } from 'react-router-dom'

const navbar = () => {

  const navigate = useNavigate()

  return (
     <div className="navbar bg-[#09090B] shadow-sm lg:px-20 md:px-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden md:hidden ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Home</a></li>
        <li><a>Product</a></li>
        <li><a>About Us</a></li>
        <li><a>Contact</a></li>
      </ul>
    </div>
    <div className='cursor-pointer' onClick={() => navigate('/')}>
    <span className="text-2xl font-bold text-white">Quick</span>
    <span className="text-2xl font-bold text-[#D63854]">Kart</span>
    
  </div>
  </div>
  <div className="navbar-center bg-[#1e1e1e] hidden md:flex lg:flex gap-x-5 border border-gray-700 text-gray-200 px-4 py-2 rounded-3xl animation duration-300">
    <Link className='hover:text-[#D63854] cursor-pointer ' to='/'>Home</Link>
    <Link className='hover:text-[#D63854] cursor-pointer ' to='/product'>Product</Link>
    <Link className='hover:text-[#D63854] cursor-pointer ' to='/about-us'>About Us</Link>
    <Link className='hover:text-[#D63854] cursor-pointer ' to='/contact'>Contact</Link>
  </div>
  <div className="navbar-end">
    <div className='px-5'>
     <button className="btn btn-ghost btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button>
    </div>
  </div>
</div>
  )
}

export default navbar