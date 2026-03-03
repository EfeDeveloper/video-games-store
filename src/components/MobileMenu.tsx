import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import {
  RiTwitterLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiFacebookFill,
} from 'react-icons/ri';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Streams', href: '#' },
    { label: 'Game store', href: '#' },
    { label: 'News', href: '#' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden z-40 fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="lg:hidden top-0 left-0 z-50 fixed flex flex-col bg-background shadow-2xl w-full sm:w-80 h-full"
          >
            <div className="flex justify-between items-center p-6 border-gray-700 border-b">
              <h2 className="font-bold text-white text-xl">Menu</h2>
              <button
                onClick={onClose}
                className="hover:bg-gray-700 p-2 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <FiX className="text-white" size={24} />
              </button>
            </div>

            <nav className="flex-1 p-6">
              <ul className="space-y-4">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="block hover:bg-gray-800 p-3 rounded-lg font-medium text-gray-300 hover:text-primary text-lg transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-6 border-gray-700 border-t">
              <h3 className="mb-4 font-semibold text-gray-400 text-sm uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
                  aria-label="Twitter"
                >
                  <RiTwitterLine className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
                  aria-label="Instagram"
                >
                  <RiInstagramLine className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
                  aria-label="YouTube"
                >
                  <RiYoutubeLine className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center bg-gray-700 hover:bg-primary rounded-lg w-10 h-10 transition-colors"
                  aria-label="Facebook"
                >
                  <RiFacebookFill className="text-white" size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
