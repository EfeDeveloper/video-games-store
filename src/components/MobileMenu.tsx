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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden z-40 fixed inset-0 bg-gradient-to-br from-purple-900/50 via-background/80 to-purple-900/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden top-0 left-0 z-50 fixed flex flex-col bg-gradient-to-b from-purple-dark to-background shadow-glow-multi border-primary/30 border-r w-full sm:w-80 h-full"
          >
            <div className="flex justify-between items-center bg-gradient-to-r from-purple-900/50 to-transparent p-6 border-primary/20 border-b">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-accent font-bold text-transparent text-xl">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="hover:bg-primary/20 hover:shadow-glow-purple p-2 rounded-lg transition-all"
                aria-label="Close menu"
              >
                <FiX className="text-accent" size={24} />
              </button>
            </div>

            <div className="flex flex-col flex-1 justify-center items-center p-6">
              <div className="text-center">
                <h3 className="bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-bright mb-1 font-black text-transparent text-5xl tracking-wider">
                  EDFER
                </h3>
                <span className="block mb-3 font-light text-accent/80 text-sm tracking-[0.3em]">
                  Video Games
                </span>
                <p className="text-gray-400 text-sm">
                  Discover amazing games
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-transparent to-purple-900/30 p-6 border-primary/20 border-t">
              <h3 className="mb-4 font-semibold text-accent text-sm uppercase tracking-wider">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-primary to-primary hover:to-neon shadow-md hover:shadow-glow-purple rounded-lg w-11 h-11 hover:scale-110 transition-all"
                  aria-label="Twitter"
                >
                  <RiTwitterLine className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-neon to-neon hover:to-accent shadow-md hover:shadow-glow-pink rounded-lg w-11 h-11 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <RiInstagramLine className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-accent to-accent hover:to-cyan-bright shadow-md hover:shadow-glow-cyan rounded-lg w-11 h-11 hover:scale-110 transition-all"
                  aria-label="YouTube"
                >
                  <RiYoutubeLine className="text-white" size={20} />
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center bg-gradient-to-br from-purple-700 hover:from-primary to-primary hover:to-purple-500 shadow-md hover:shadow-glow-purple rounded-lg w-11 h-11 hover:scale-110 transition-all"
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
