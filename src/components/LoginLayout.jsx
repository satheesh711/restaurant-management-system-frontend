import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import loginImg from "../assets/logo1.ico"

export function LoginLayout({ children, title, subtitle }) {

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">

      <div className="d-flex flex-column flex-lg-row w-100 gap-5" style={{ maxWidth: '68rem' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="d-none d-lg-flex w-100 w-lg-50 d-flex align-items-center p-0"
          style={{
            maxHeight: '100vh',
            height: "auto",
            transition: 'height 0.5s ease-in-out'
          }}
        >
          <div className="rounded overflow-hidden">
            <motion.img
              src={loginImg}
              alt="Login background"
              className=" object-fit-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-100 w-lg-50 d-flex align-items-center p-0"
        >
          <div 
            className="w-100 shadow-lg rounded p-4 p-md-5 bg-light"
            style={{
              maxHeight: '100vh',
              overflow: 'auto',
              transition: 'height 0.5s ease-in-out'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, rotateY: 90, scale: 0.9  }}
                animate={{ opacity: 1, rotateY: 0,scale: 1  }}
                exit={{ opacity: 0, rotateY: -90,scale: 0.9  }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="mb-4 text-center"
              >
                <h2 className="display-5 fw-bold text-primary mb-2">{title}</h2>
                <p className="text-muted">{subtitle}</p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                 
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}