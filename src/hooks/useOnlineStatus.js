import { useState, useEffect } from 'react';

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = (event, online) => {
      setIsOnline(online);
    };

    // Listen for the event
    window.electron.onOnlineStatus(handleOnlineStatus);

    // Check the initial online status
    window.electron.checkOnlineStatus();

    // Cleanup the event listener
    return () => {
      window.electron.onOnlineStatus(() => {}); // Remove listener
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
