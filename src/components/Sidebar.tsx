import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ChevronDown,
  Menu,
  LogOut,
  FolderTree,
  File,
  Package,
  User,
  Layout,
} from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import AppRoutes from '../constants/app_routes';
import { RiFilePaper2Line } from 'react-icons/ri';
import { MdCampaign } from 'react-icons/md';

interface SubMenuItem {
  title: string;
  path: string;
  count?: number;
  color?: string;
  icon?: React.ReactNode;
}

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  path?: string;
  subItems?: SubMenuItem[];
}

const MenuItem: React.FC<MenuItem & { isCollapsed: boolean }> = ({ icon, title, path, subItems, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = path ? location.pathname === path : subItems?.some(item => location.pathname === item.path);

  useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false);
    }
  }, [isCollapsed]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isCollapsed && subItems) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isCollapsed) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <div
        className={`mx-2 flex items-center ${isCollapsed ? 'justify-center p-1' : 'py-0.5'} rounded text-gray-300 hover:bg-gray-700 cursor-pointer ${
          isActive ? 'bg-gray-700' : ''
        }`}
        onClick={() => {
          if (subItems && !isCollapsed) {
            setIsOpen(!isOpen);
          } else if (path) {
            navigate(path);
          }
        }}
      >
        <div className="flex items-center justify-center w-8 h-8 ">
          {icon}
        </div>
        {!isCollapsed && (
          <>
            <span className="ml-1 text-sm">{title}</span>
            {subItems && (
              <ChevronDown
                className={`w-4 h-4 ml-auto transition-transform duration-200 mr-2 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            )}
          </>
        )}
      </div>
      {
        !subItems && (
            <AnimatePresence>
          {((isCollapsed && isHovered) || (!isCollapsed && isOpen)) && (
            <motion.div
              initial={isCollapsed ? { opacity: 0 } : { height: 0 }}
              animate={isCollapsed ? { opacity: 1 } : { height: 'auto' }}
              exit={isCollapsed ? { opacity: 0 } : { height: 0 }}
              transition={isCollapsed ? { duration: 0.2 } : { duration: 0.2 }}
              className={`mx-2 overflow-hidden bg-gray-800 ${
                isCollapsed ? 'absolute left-full top-0  rounded shadow-lg z-50' : 'mt-1 flex flex-col space-y-2'
              }`}
              style={isCollapsed ? {
                position: 'fixed',
                left: '60px',
                top: menuRef.current ? menuRef.current.getBoundingClientRect().top + 4 : 'auto',
              } : {}}
            >
                              {
                isCollapsed && (
                  <>
                    <p className="px-4 py-1.5 text-sm text-blue-400 text-center">{title}</p>
                    <hr className="border-gray-700" />
                  </>
                )
              }
            </motion.div>
          )}
        </AnimatePresence>
        )
      }
      {subItems && (
        <AnimatePresence>
          {((isCollapsed && isHovered) || (!isCollapsed && isOpen)) && (
            <motion.div
              initial={isCollapsed ? { opacity: 0 } : { height: 0 }}
              animate={isCollapsed ? { opacity: 1 } : { height: 'auto' }}
              exit={isCollapsed ? { opacity: 0 } : { height: 0 }}
              transition={isCollapsed ? { duration: 0.4 } : { duration: 0.2 }}
              className={`mx-2 overflow-hidden bg-gray-800 ${
                isCollapsed ? 'absolute left-full top-0 w-48 rounded shadow-lg z-50' : 'mt-1 flex flex-col space-y-2'
              }`}
              style={isCollapsed ? {
                position: 'fixed',
                left: '60px',
                top: menuRef.current ? menuRef.current.getBoundingClientRect().top : 'auto',
              } : {}}
            >
                              {
                isCollapsed && (
                  <>
                    <p className="px-4 py-1.5 text-sm text-blue-400 text-center">{title}</p>
                    <hr className="border-gray-700" />
                  </>
                )
              }

              {subItems.map((item, index) => (
                <NavLink to={item.path} key={index}>
                  <div className="flex items-center justify-between px-4 py-1.5 text-sm text-gray-400 hover:bg-gray-700 cursor-pointer">
                    <div className={`${isCollapsed ? '' : 'pl-2'}`}>
                      <div className="flex items-center">
                        <span className="mr-2">{item.icon ?? '-'}</span>
                        <span>{item.title}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className={`px-2 py-1 text-xs text-white rounded-full ${item.color || 'bg-blue-500'}`}>
                          {item.count}
                        </span>
                      )}
                    </div>
                  </div>
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const menuItems: MenuItem[] = [
  { icon: <Home size={20} />, title: "Dashboard", path: "/" },
  { icon: <MdCampaign size={20} />, title: "Events", path: AppRoutes.EVENTS },
  { icon: <RiFilePaper2Line size={20} />, title: "Announces", path: AppRoutes.ANNOUNCES },
  { icon: <User size={20} />, title: "Users", path: AppRoutes.USERS },
  { icon: <Layout size={20} />, title: "Managers", subItems: [
    { title: "All Managers", path: AppRoutes.MANAGERS },
  ]},
  {
    icon: <File size={20}/>, title: 'Article Management',
    subItems: [
      {
        title: 'All Articles',
        path: AppRoutes.ARTICLES,
        icon: <FolderTree size={20}/>
      },
      {
        title: 'Article Categories',
        path: AppRoutes.ARTICLE_CATEGORIES,
        icon: <Package size={20}/>
      },
    ]
  },
];


const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  console.log(isMobile);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsCollapsed(true);
      // setIsCollapsed(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <motion.div
      initial={{ width: isCollapsed ? 64 : 250 }}
      animate={{ width: isCollapsed ? 64 : 250 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 text-white h-full overflow-hidden flex flex-col"
    >
      <div className='flex items-center justify-between p-4 border-b border-gray-700'>
        {!isCollapsed && <span className="text-xl font-semibold">Green Connect</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto sidebar-scroll space-y-2 mt-2">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} isCollapsed={isCollapsed} />
        ))}
      </div>
      <hr className="border-gray-500 mb-3" />

      <div>
      {
        isCollapsed ? (
          <div className='px-2 text-red-600 py-2 rounded mx-2 mb-3 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
            <LogOut size={20} />
          </div>
        ): (
          <div className='px-2 py-1.5 text-red-600 rounded mx-2 mb-3 flex items-center hover:bg-gray-700 cursor-pointer'>
            <LogOut size={20} className='mr-2'/>
            <p>Logout</p>
          </div>
        )
      }
      </div>
    </motion.div>
  );
};

export default Sidebar;