import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white p-5 shadow-md">
      <div className="flex navbar justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-bold text-2xl text-gradient"
          style={({ isActive }) => ({
            fontWeight: isActive ? 'bold' : 'normal',
            color: isActive ? '#4F46E5' : 'white',
          })}
        >
          JobMatchr
        </NavLink>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/About"
            className="px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            style={({ isActive }) => ({
              color: isActive ? '#4F46E5' : '',
            })}
          >
            About
          </NavLink>
          <NavLink
            to="/Services"
            className="px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            style={({ isActive }) => ({
              color: isActive ? '#4F46E5' : '',
            })}
          >
            Services
          </NavLink>
          <NavLink
            to="/Pricing"
            className="px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            style={({ isActive }) => ({
              color: isActive ? '#4F46E5' : '',
            })}
          >
            Pricing
          </NavLink>
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            style={({ isActive }) => ({
              color: isActive ? '#4F46E5' : '',
            })}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            style={({ isActive }) => ({
              color: isActive ? '#4F46E5' : '',
            })}
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
