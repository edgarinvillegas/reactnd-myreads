/**
 * Wrapper for react-toastify
 * Usage:
 *
 * import * as Notification from './Notification';
 *
 * <Notification.Container />  //-> Must exist somewhere in the component tree
 *
 * Notification.show('This is a message that appears bottom right on the screen');
 */

import { ToastContainer, toast, style } from 'react-toastify';

/**
 * Shows a notification message in the bottom right corner of the page
 * It needs a Notification.Container component to exist in the component tree
 * @param {string} text
 */
const notify = (text) => {
  //Styling for the toast
  style({
    colorProgressDefault: ""
  });
  toast(text, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export { notify, ToastContainer as NotificationContainer };
