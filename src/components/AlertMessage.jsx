import { useState } from 'react';
import { CloseButton } from './index';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ type, message, showAlert, setShowAlert }) => {
  const [animationClass, setAnimationClass] = useState('toast-message-animate-in');
  let alertClass = '';

  switch (type) {
    case 'success':
      alertClass = 'bg-green-500 text-white';
      break;
    case 'warning':
      alertClass = 'bg-yellow-500 text-white';
      break;
    case 'error':
      alertClass = 'bg-red-500 text-white';
      break;
    default:
      alertClass = 'bg-blue-500 text-white';
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimationClass('toast-message-animate-out');
      setTimeout(() => {
        setShowAlert(false);
      }, 400);
    }, 4000);
    
    return () => clearTimeout(timeoutId);
  }, [setShowAlert])

  return (
    showAlert ? 
      <div className={`fixed top-16 p-4 right-3 z-[80] toast-message-animate-in ${animationClass} rounded ${alertClass}`}>
        <div className="flex items-center gap-3">
          {message}
          <CloseButton setIsOpen={setShowAlert} />
        </div>
      </div> : null
  );
};

AlertMessage.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'error']),
  showAlert: PropTypes.bool.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertMessage;
