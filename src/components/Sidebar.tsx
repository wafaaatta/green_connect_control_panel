import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ChevronDown,
  Menu,
  MapPin,
  FileText,
  LogOut,
  Activity,
  Award,
  BarChart,
  BarChart2,
  Bell,
  Box,
  Briefcase,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileSignature,
  FolderTree,
  Gift,
  HeadphonesIcon,
  Layers,
  Mail,
  Megaphone,
  Palette,
  Percent,
  PieChart,
  Plus,
  RefreshCw,
  Scissors,
  Settings,
  Share2,
  Shield,
  ShoppingBag,
  Star,
  Store,
  Tag,
  TrendingUp,
  Truck,
  UserCog,
  UserPlus,
  Users,
  AlertTriangle,
  Aperture,
  AtSign,
  Book,
  Bookmark,
  BookOpen,
  Calendar,
  Clock,
  Coffee,
  Cpu,
  Crosshair,
  Database,
  Feather,
  FileCheck,
  GitBranch,
  Globe,
  Grid,
  HardDrive,
  Headphones,
  HelpCircle,
  Layout,
  List,
  MessageCircle,
  MessageSquare,
  Package,
  PhoneCall,
  Printer,
  Repeat,
  Send,
  Server,
  ShoppingCart,
  Sliders,
  Smartphone,
  Target,
  Type,
  Video,
  Zap,
  Image,
  LinkIcon,
  Clipboard,
  Map,
  Phone,
  Thermometer,
  Droplet,
  CheckSquare,
  AlertOctagon,
  ShieldCheck,
  Lock,
  Leaf,
} from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { BsPeople } from 'react-icons/bs';
import { RiLockUnlockLine } from 'react-icons/ri';

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
    { icon: <Home size={20} />, title: "Main Dashboard", path: "/admin/dashboard" },
    { 
      icon: <ShoppingBag size={20} />, 
      title: "Product Management", 
      
      subItems: [
        { title: "Product List", path: "/admin/products/list", icon: <FileText size={20} /> },
        { title: "Add New Product", path: "/admin/products/add", icon: <Plus size={20} /> },
        { title: "Category Management", path: "/admin/products/categories", icon: <FolderTree size={20} /> },
        { title: "Brand Management", path: "/admin/products/brands", icon: <Bookmark size={20} /> },
        { title: "Attribute Management", path: "/admin/products/attributes", icon: <Sliders size={20} /> },
        { title: "Review Management", path: "/admin/products/reviews", icon: <Star size={20} /> },
        { title: "Image Management", path: "/admin/products/images", icon: <Image size={20} /> },
        { title: "Related Products", path: "/admin/products/related", icon: <GitBranch size={20} /> },
        { title: "Product Pricing", path: "/admin/products/pricing", icon: <DollarSign size={20} /> },
        { title: "Warranty Management", path: "/admin/products/warranty", icon: <Shield size={20} /> },
      ]
    },
    { 
      icon: <BsPeople size={20} />, 
      title: "Customer Management", 
      subItems: [
        { title: "Customer List", path: "/admin/customers/list", icon: <Users size={20} /> },
        { title: "Add New Customer", path: "/admin/customers/new", icon: <UserPlus size={20} /> },
        { title: "Customer Groups", path: "/admin/customers/groups", icon: <Grid size={20} /> },
        { title: "Loyalty Program", path: "/admin/customers/loyalty", icon: <Award size={20} /> },
        { title: "Points and Rewards Management", path: "/admin/customers/rewards", icon: <Gift size={20} /> },
        { title: "Customer Purchase History", path: "/admin/customers/purchase-history", icon: <FileCheck size={20} /> },
        { title: "Complaints and Suggestions Management", path: "/admin/customers/feedback", icon: <MessageCircle size={20} /> },
        { title: "Support and Assistance", path: "/admin/customers/support", icon: <Headphones size={20} /> },
      ]
    },
    { 
      icon: <BarChart2 size={20} />, 
      title: "Reports and Analytics", 
      subItems: [
        { title: "Sales Reports", path: "/admin/reports/sales", icon: <TrendingUp size={20} /> },
        { title: "Inventory Reports", path: "/admin/reports/inventory", icon: <BarChart size={20} /> },
        { title: "Customer Analytics", path: "/admin/reports/customer-analytics", icon: <PieChart size={20} /> },
        { title: "Product Performance", path: "/admin/reports/product-performance", icon: <Activity size={20} /> },
        { title: "Financial Analytics", path: "/admin/reports/financial", icon: <DollarSign size={20} /> },
        { title: "Marketing Reports", path: "/admin/reports/marketing", icon: <Target size={20} /> },
        { title: "Website Analytics", path: "/admin/reports/website-analytics", icon: <Globe size={20} /> },
        { title: "Employee Reports", path: "/admin/reports/employee-performance", icon: <UserCog size={20} /> },
        { title: "Custom Reports", path: "/admin/reports/custom", icon: <Feather size={20} /> },
      ]
    },
    { 
      icon: <Truck size={20} />, 
      title: "Order and Shipping Management", 
      subItems: [
        { title: "Order List", path: "/admin/orders/list", icon: <ClipboardList size={20} /> },
        { title: "Create New Order", path: "/admin/orders/create", icon: <Plus size={20} /> },
        { title: "Order Status", path: "/admin/orders/status", icon: <Activity size={20} /> },
        { title: "Shipment Management", path: "/admin/orders/shipments", icon: <Package size={20} /> },
        { title: "Shipment Tracking", path: "/admin/orders/tracking", icon: <MapPin size={20} /> },
        { title: "Returns and Exchanges Management", path: "/admin/orders/returns", icon: <RefreshCw size={20} /> },
        { title: "Shipping Companies", path: "/admin/orders/shipping-companies", icon: <Briefcase size={20} /> },
        { title: "Shipping Zones", path: "/admin/orders/shipping-zones", icon: <Globe size={20} /> },
        { title: "Print Invoices and Packing Lists", path: "/admin/orders/print", icon: <Printer size={20} /> },
      ]
    },
    { 
      icon: <Tag size={20} />, 
      title: "Marketing and Promotion", 
      subItems: [
        { title: "Promotional Campaign Management", path: "/admin/marketing/campaigns", icon: <Megaphone size={20} /> },
        { title: "Coupon Management", path: "/admin/marketing/coupons", icon: <Scissors size={20} /> },
        { title: "Special Offers", path: "/admin/marketing/special-offers", icon: <Zap size={20} /> },
        { title: "Email Marketing", path: "/admin/marketing/email", icon: <Mail size={20} /> },
        { title: "Social Media Management", path: "/admin/marketing/social-media", icon: <Share2 size={20} /> },
        { title: "Affiliate Marketing Program", path: "/admin/marketing/affiliate", icon: <Users size={20} /> },
        { title: "Ad Management", path: "/admin/marketing/ads", icon: <Aperture size={20} /> },
        { title: "Search Engine Optimization", path: "/admin/marketing/seo", icon: <Crosshair size={20} /> },
        { title: "Marketing Content Management", path: "/admin/marketing/content", icon: <FileText size={20} /> },
      ]
    },
    { 
      icon: <Box size={20} />, 
      title: "Inventory Management", 
      subItems: [
        { title: "Inventory List", path: "/admin/inventory/list", icon: <Layers size={20} /> },
        { title: "Warehouse Management", path: "/admin/inventory/warehouses", icon: <Home size={20} /> },
        { title: "Purchase Orders", path: "/admin/inventory/purchase-orders", icon: <FileSignature size={20} /> },
        { title: "Supplier Management", path: "/admin/inventory/suppliers", icon: <Truck size={20} /> },
        { title: "Inventory Alerts", path: "/admin/inventory/alerts", icon: <Bell size={20} /> },
        { title: "Stock Take", path: "/admin/inventory/stock-take", icon: <Clipboard size={20} /> },
        { title: "Inventory Transfers", path: "/admin/inventory/transfers", icon: <Repeat size={20} /> },
        { title: "Inventory Reports", path: "/admin/inventory/reports", icon: <BarChart size={20} /> },
      ]
    },
    { 
      icon: <DollarSign size={20} />, 
      title: "Financial Management", 
      subItems: [
        { title: "Financial Dashboard", path: "/admin/finance/dashboard", icon: <Activity size={20} /> },
        { title: "Invoice Management", path: "/admin/finance/invoices", icon: <FileText size={20} /> },
        { title: "Payment Management", path: "/admin/finance/payments", icon: <CreditCard size={20} /> },
        { title: "Income and Expenses", path: "/admin/finance/income-expenses", icon: <TrendingUp size={20} /> },
        { title: "Tax Management", path: "/admin/finance/taxes", icon: <Percent size={20} /> },
        { title: "Financial Reports", path: "/admin/finance/reports", icon: <BarChart2 size={20} /> },
        { title: "Currency Management", path: "/admin/finance/currencies", icon: <Repeat size={20} /> },
        { title: "Payment Settings", path: "/admin/finance/payment-settings", icon: <Sliders size={20} /> },
      ]
    },
    { 
      icon: <Layout size={20} />, 
      title: "Website Management", 
      subItems: [
        { title: "Interface Customization", path: "/admin/website/customization", icon: <Palette size={20} /> },
        { title: "Page Management", path: "/admin/website/pages", icon: <FileText size={20} /> },
        { title: "Menu Management", path: "/admin/website/menus", icon: <List size={20} /> },
        { title: "Slider Management", path: "/admin/website/sliders", icon: <Image size={20} /> },
        { title: "Comment Management", path: "/admin/website/comments", icon: <MessageCircle size={20} /> },
        { title: "Link Management", path: "/admin/website/links", icon: <LinkIcon size={20} /> },
        { title: "Language Settings", path: "/admin/website/language", icon: <Globe size={20} /> },
        { title: "Media Management", path: "/admin/website/media", icon: <Image size={20} /> },
        { title: "Backup and System Restore", path: "/admin/website/backup-restore", icon: <Database size={20} /> },
      ]
    },
    { 
      icon: <Settings size={20} />, 
      title: "Settings", 
      subItems: [
        { title: "General Store Settings", path: "/admin/settings/general", icon: <Store size={20} /> },
        { title: "Security Settings", path: "/admin/settings/security", icon: <Shield size={20} /> },
        { title: "User and Role Management", path: "/admin/settings/users", icon: <UserCog size={20} /> },
        { title: "Notification Settings", path: "/admin/settings/notifications", icon: <Bell size={20} /> },
        { title: "Email Settings", path: "/admin/settings/email", icon: <AtSign size={20} /> },
        { title: "Integration Settings", path: "/admin/settings/integrations", icon: <Zap size={20} /> },
        { title: "Mobile App Settings", path: "/admin/settings/mobile-app", icon: <Smartphone size={20} /> },
        { title: "Privacy Settings", path: "/admin/settings/privacy", icon: <RiLockUnlockLine size={20} /> },
        { title: "System Logs", path: "/admin/settings/logs", icon: <HardDrive size={20} /> },
      ]
    },
    { 
        icon: <Coffee size={20} />, 
        title: "Human Resources Management", 
        subItems: [
          { title: "Employee List", path: "/admin/hr/employees", icon: <Users size={20} /> },
          { title: "Shift Schedule", path: "/admin/hr/shifts", icon: <Calendar size={20} /> },
          { title: "Leave Management", path: "/admin/hr/leave", icon: <Calendar size={20} /> },
          { title: "Performance Evaluation", path: "/admin/hr/performance", icon: <Target size={20} /> },
          { title: "Training and Development", path: "/admin/hr/training", icon: <BookOpen size={20} /> },
          { title: "Payroll Management", path: "/admin/hr/payroll", icon: <DollarSign size={20} /> },
          { title: "Recruitment", path: "/admin/hr/recruitment", icon: <UserPlus size={20} /> },
          { title: "Organizational Structure", path: "/admin/hr/org-structure", icon: <GitBranch size={20} /> },
          { title: "Company Policies", path: "/admin/hr/policies", icon: <FileText size={20} /> },
        ]
      },
      { 
        icon: <ShoppingCart size={20} />, 
        title: "Sales Management", 
        subItems: [
          { title: "Sales Dashboard", path: "/admin/sales/dashboard", icon: <BarChart2 size={20} /> },
          { title: "Offer Management", path: "/admin/sales/offers", icon: <Tag size={20} /> },
          { title: "Price Management", path: "/admin/sales/pricing", icon: <DollarSign size={20} /> },
          { title: "Sales Goals", path: "/admin/sales/goals", icon: <Target size={20} /> },
          { title: "Sales Reports", path: "/admin/sales/reports", icon: <FileText size={20} /> },
          { title: "Sales Team Management", path: "/admin/sales/team", icon: <Users size={20} /> },
          { title: "Lead Management", path: "/admin/sales/leads", icon: <UserPlus size={20} /> },
          { title: "Sales Forecasts", path: "/admin/sales/forecasts", icon: <TrendingUp size={20} /> },
        ]
      },
      { 
        icon: <Cpu size={20} />, 
        title: "System Management", 
        subItems: [
          { title: "System Performance", path: "/admin/system/performance", icon: <Activity size={20} /> },
          { title: "Database Management", path: "/admin/system/database", icon: <Database size={20} /> },
          { title: "File Management", path: "/admin/system/file-management", icon: <HardDrive size={20} /> },
          { title: "System Updates", path: "/admin/system/updates", icon: <RefreshCw size={20} /> },
          { title: "Cron Job Management", path: "/admin/system/cron-jobs", icon: <Clock size={20} /> },
          { title: "System Logs", path: "/admin/system/logs", icon: <AlertTriangle size={20} /> },
          { title: "Server Settings", path: "/admin/system/server-settings", icon: <Server size={20} /> },
          { title: "API Management", path: "/admin/system/api-management", icon: <Zap size={20} /> },
        ]
      },
      { 
        icon: <HelpCircle size={20} />, 
        title: "Help and Support", 
        subItems: [
          { title: "User Guide", path: "/admin/support/user-guide", icon: <Book size={20} /> },
          { title: "FAQ", path: "/admin/support/faq", icon: <HelpCircle size={20} /> },
          { title: "Support Tickets", path: "/admin/support/tickets", icon: <MessageSquare size={20} /> },
          { title: "Knowledge Base", path: "/admin/support/knowledge-base", icon: <Database size={20} /> },
          { title: "Updates and News", path: "/admin/support/updates", icon: <Bell size={20} /> },
          { title: "Contact Us", path: "/admin/support/contact", icon: <PhoneCall size={20} /> },
          { title: "Online Training", path: "/admin/support/online-training", icon: <Video size={20} /> },
        ]
      },
      { 
        icon: <Globe size={20} />, 
        title: "International Expansion", 
        subItems: [
          { title: "Language Management", path: "/admin/international/languages", icon: <Type size={20} /> },
          { title: "Currency Management", path: "/admin/international/currencies", icon: <DollarSign size={20} /> },
          { title: "International Tax Settings", path: "/admin/international/taxes", icon: <Percent size={20} /> },
          { title: "Geo Zone Management", path: "/admin/international/geo-zones", icon: <Map size={20} /> },
          { title: "Localization", path: "/admin/international/localization", icon: <Globe size={20} /> },
          { title: "International Shipping Management", path: "/admin/international/shipping", icon: <Send size={20} /> },
          { title: "International Trade Regulations", path: "/admin/international/trade-regulations", icon: <FileText size={20} /> },
        ]
      },
      { 
        icon: <Smartphone size={20} />, 
        title: "Mobile App Management", 
        subItems: [
          { title: "App Settings", path: "/admin/mobile/settings", icon: <Settings size={20} /> },
          { title: "Notification Management", path: "/admin/mobile/notifications", icon: <Bell size={20} /> },
          { title: "Interface Customization", path: "/admin/mobile/customization", icon: <Palette size={20} /> },
          { title: "App Analytics", path: "/admin/mobile/analytics", icon: <BarChart2 size={20} /> },
          { title: "Version Management", path: "/admin/mobile/versions", icon: <GitBranch size={20} /> },
          { title: "Performance Reports", path: "/admin/mobile/performance", icon: <Activity size={20} /> },
          { title: "User Support", path: "/admin/mobile/user-support", icon: <HeadphonesIcon size={20} /> },
        ]
      },
    ];

// Suggested new routes for your store system and control panel

const suggestedNewRoutes: MenuItem[] = [
  { 
    icon: <TrendingUp size={20} />, 
    title: "Business Intelligence", 
    subItems: [
      { title: "AI-Powered Insights", path: "/admin/bi/ai-insights", icon: <Cpu size={20} /> },
      { title: "Predictive Analytics", path: "/admin/bi/predictive-analytics", icon: <TrendingUp size={20} /> },
      { title: "Competitive Analysis", path: "/admin/bi/competitive-analysis", icon: <Users size={20} /> },
      { title: "Market Trends", path: "/admin/bi/market-trends", icon: <BarChart2 size={20} /> },
      { title: "Customer Behavior Analysis", path: "/admin/bi/customer-behavior", icon: <Activity size={20} /> },
    ]
  },
  { 
    icon: <ShieldCheck size={20} />, 
    title: "Risk Management", 
    subItems: [
      { title: "Fraud Detection", path: "/admin/risk/fraud-detection", icon: <AlertTriangle size={20} /> },
      { title: "Compliance Management", path: "/admin/risk/compliance", icon: <CheckSquare size={20} /> },
      { title: "Data Privacy", path: "/admin/risk/data-privacy", icon: <Lock size={20} /> },
      { title: "Risk Assessment", path: "/admin/risk/assessment", icon: <FileText size={20} /> },
      { title: "Incident Management", path: "/admin/risk/incidents", icon: <AlertOctagon size={20} /> },
    ]
  },
  { 
    icon: <Droplet size={20} />, 
    title: "Sustainability", 
    subItems: [
      { title: "Carbon Footprint Tracking", path: "/admin/sustainability/carbon-footprint", icon: <Thermometer size={20} /> },
      { title: "Eco-Friendly Products", path: "/admin/sustainability/eco-products", icon: <Leaf size={20} /> },
      { title: "Sustainable Packaging", path: "/admin/sustainability/packaging", icon: <Package size={20} /> },
      { title: "Energy Efficiency", path: "/admin/sustainability/energy", icon: <Zap size={20} /> },
      { title: "Sustainability Reports", path: "/admin/sustainability/reports", icon: <FileText size={20} /> },
    ]
  },
  { 
    icon: <Headphones size={20} />, 
    title: "Omnichannel Support", 
    subItems: [
      { title: "Live Chat Management", path: "/admin/support/live-chat", icon: <MessageCircle size={20} /> },
      { title: "Chatbot Configuration", path: "/admin/support/chatbot", icon: <MessageSquare size={20} /> },
      { title: "Social Media Support", path: "/admin/support/social-media", icon: <Share2 size={20} /> },
      { title: "Phone Support Management", path: "/admin/support/phone", icon: <Phone size={20} /> },
      { title: "Support Analytics", path: "/admin/support/analytics", icon: <BarChart2 size={20} /> },
    ]
  },
  { 
    icon: <Briefcase size={20} />, 
    title: "B2B Management", 
    subItems: [
      { title: "Corporate Accounts", path: "/admin/b2b/accounts", icon: <Users size={20} /> },
      { title: "Bulk Ordering", path: "/admin/b2b/bulk-orders", icon: <Package size={20} /> },
      { title: "Contract Management", path: "/admin/b2b/contracts", icon: <FileText size={20} /> },
      { title: "B2B Pricing", path: "/admin/b2b/pricing", icon: <DollarSign size={20} /> },
      { title: "B2B Analytics", path: "/admin/b2b/analytics", icon: <BarChart2 size={20} /> },
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
        {!isCollapsed && <span className="text-xl font-semibold">Zaindev Store</span>}
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