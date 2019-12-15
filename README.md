# useEventListener

React hook for `element.addEventListener` and `element.removeEventListener`.

### Install

`npm i @toolia/use-event-listener`

or

`yarn add @toolia/use-event-listener`

> Requires React >= 16.8.0 installed

### Arguments

`(targetElement, eventName, eventHandler[, { initialiseOnAttach = false, logAttachChange = false }, listenerOpts])`

These arguments are used to add / remove event listeners like so:

`targetElement.addEventListener(eventName, eventHandler, listenerOpts);`

initialiseOnAttach will trigger `eventHandler` when the event listener is first attached.

logAttachChange will console.warn when either `.addEventListener` or `.removeEventListener` are called.

### Example usage

This example registers the 'resize' event listener with a throttled handler function to obtain the viewport width and height.

```
import React, { useState, useCallback } from "react";
import useEventListener from '@toolia/use-event-listener';
import { throttle } from 'throttle-debounce';

const Viewport = () => {
  const [{ width, height}, setSize] = useState(initialSize);

  const throttledGetWindowSize = useCallback(throttle(300, e => {
    const target = e.target;
    console.log('resizing with', target.innerWidth);
    setSize({
      width: target.innerWidth,
      height: target.innerHeight
    });
  }), [ throttle ]);

  const setListenToSize = useEventListener(window, 'resize',
    throttledGetWindowSize,
    {
      initialiseOnAttach: true,
      logAttachChange: true
    }
  );
  
  return (
    <div>
      <p>width: {width}</p>
      <p>height: {height}</p>
      <button onClick={()=>setListenToSize(false)}>Un-listen</button>
      <button onClick={()=>setListenToSize(true)}>Listen</button>
    </div>
  );
};
```