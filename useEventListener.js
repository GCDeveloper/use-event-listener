import { useState, useEffect, useCallback } from "react";
const useEventListener = (
  target,
  eventName,
  eventHandler,
  { initialiseOnAttach = false, logAttachChange = false } = {},
  listenerOpts
) => {
  const [listening, setListening] = useState(true);
  const memoizedCallback = useCallback(eventHandler, [eventHandler]);
  useEffect(() => {
    if (listening) {
      if (logAttachChange)
        console.warn("Adding event listener. Event:", eventName);
      target.addEventListener(eventName, memoizedCallback, listenerOpts);
      if (initialiseOnAttach) {
        const eventObject = new Event(eventName);
        target.dispatchEvent(eventObject);
      }
    }
    return () => {
      if (logAttachChange)
        console.warn("Removing event listener. Event:", eventName);
      target.removeEventListener(eventName, memoizedCallback, listenerOpts);
    };
  }, [target, listening, initialiseOnAttach, logAttachChange]);
  return [listening, setListening];
};
export default useEventListener;
