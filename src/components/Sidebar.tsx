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
  Mail,
} from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import AppRoutes from '../constants/app_routes';
import { RiFilePaper2Line } from 'react-icons/ri';
import { MdCampaign } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
            <span className="ml-1 text-sm">{t(title)}</span>
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
                    <p className="px-4 py-1.5 text-sm text-blue-400 text-center">{t(title)}</p>
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
                    <p className="px-4 py-1.5 text-sm text-blue-400 text-center">{t(title)}</p>
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
                        <span>{t(item.title)}</span>
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

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile);
  
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    { icon: <Home size={20} />, title: "sidebar.dashboard", path: "/" },
    { icon: <MdCampaign size={20} />, title: "sidebar.events", path: AppRoutes.EVENTS },
    { icon: <RiFilePaper2Line size={20} />, title: "sidebar.announces", path: AppRoutes.ANNOUNCES },
    { icon: <User size={20} />, title: "sidebar.users", path: AppRoutes.USERS },
    { icon: <Layout size={20} />, title: "sidebar.allManagers", path: AppRoutes.MANAGERS },
    { icon: <Mail size={20} />, title: "sidebar.contactSubmissions", path: AppRoutes.CONTACT_SUBMISSIONS },
    {
      icon: <File size={20}/>, title: 'sidebar.articleManagement',
      subItems: [
        {
          title: 'sidebar.allArticles',
          path: AppRoutes.ARTICLES,
          icon: <FolderTree size={20}/>
        },
        {
          title: 'sidebar.articleCategories',
          path: AppRoutes.ARTICLE_CATEGORIES,
          icon: <Package size={20}/>
        },
      ]
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsCollapsed(true);
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
        {!isCollapsed && <span className="text-xl font-semibold">{t('sidebar.greenConnect')}</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label={t('sidebar.toggleSidebar')}
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
            <p>{t('sidebar.logout')}</p>
          </div>
        )
      }
      </div>
    </motion.div>
  );
};

export default Sidebar;