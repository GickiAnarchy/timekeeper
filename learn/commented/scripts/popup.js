// Original L1: Blank line separates related code sections for readability.

// Original L2: Blank line separates related code sections for readability.

// Original L3: Exports this reusable UI setup function so the shell can initialize it from another module.
export function confirmDialog(message = 'Are you sure?', confirmText = 'Yes', cancelText = 'Cancel') {
// Original L4: `document.activeElement` (the active element property of document); stores the result in `returnFocus`. const prevents reassignment of this binding, not mutation inside its object/array.
  const returnFocus = document.activeElement;
// Original L5: Creates a detached HTML element with tag "dialog"; it is not visible until inserted in the page; stores the result in `dialog`. const prevents reassignment of this binding, not mutation inside its object/array.
  const dialog = document.createElement('dialog');
// Original L6: Adds, removes, or selects CSS classes that control this element’s appearance/state.
  dialog.className = 'confirm-dialog';
// Original L7: Creates a detached HTML element with tag "p"; it is not visible until inserted in the page; stores the result in `text`. const prevents reassignment of this binding, not mutation inside its object/array.
  const text = document.createElement('p');
// Original L8: Writes user-visible text into the element; textContent avoids treating data as HTML.
  text.textContent = message;
// Original L9: Creates a detached HTML element with tag "form"; it is not visible until inserted in the page; stores the result in `form`. const prevents reassignment of this binding, not mutation inside its object/array.
  const form = document.createElement('form');
// Original L10: Assigns the result of 'dialog' to form.method, updating this control or record for the next step.
  form.method = 'dialog';
// Original L11: Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `cancel`. const prevents reassignment of this binding, not mutation inside its object/array.
  const cancel = document.createElement('button');
// Original L12: Assigns the result of 'submit' to cancel.type, updating this control or record for the next step.
  cancel.type = 'submit';
// Original L13: Assigns the result of 'cancel' to cancel.value, updating this control or record for the next step.
  cancel.value = 'cancel';
// Original L14: Writes user-visible text into the element; textContent avoids treating data as HTML.
  cancel.textContent = cancelText;
// Original L15: Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `confirm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const confirm = document.createElement('button');
// Original L16: Assigns the result of 'submit' to confirm.type, updating this control or record for the next step.
  confirm.type = 'submit';
// Original L17: Assigns the result of 'confirm' to confirm.value, updating this control or record for the next step.
  confirm.value = 'confirm';
// Original L18: Writes user-visible text into the element; textContent avoids treating data as HTML.
  confirm.textContent = confirmText;
// Original L19: Places the newly built child elements into the document so the user can see them.
  form.append(cancel, confirm);
// Original L20: Places the newly built child elements into the document so the user can see them.
  dialog.append(text, form);
// Original L21: Returns constructs a new instance of `Promise` with a callback taking resolve that runs its enclosed statements to the caller and exits this function.
  return new Promise(resolve => {
// Original L22: Registers a handler so a user action or browser event triggers the page behavior described here.
    dialog.addEventListener('close', () => {
// Original L23: Checks that `dialog.returnValue` (the return value property of dialog) and "confirm" have the same value and type; stores the result in `accepted`. const prevents reassignment of this binding, not mutation inside its object/array.
      const accepted = dialog.returnValue === 'confirm';
// Original L24: Calls `dialog.remove` with no arguments.
      dialog.remove();
// Original L25: Checks whether `returnFocus?.isConnected` (the is connected property of returnFocus); optional chaining stops with undefined if a guarded receiver is null or undefined; runs the following statement/block only when truthy.
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
// Original L26: Calls `resolve` with `accepted` (accepted).
      resolve(accepted);
// Original L27: Sets the object field once using true. This field is read later through its property name.
    }, { once: true });
// Original L28: Places the newly built child elements into the document so the user can see them.
    document.body.append(dialog);
// Original L29: Calls `dialog.showModal` with no arguments.
    dialog.showModal();
// Original L30: Calls `cancel.focus` with no arguments.
    cancel.focus();
// Original L31: Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.
  });
// Original L32: Closes function confirmDialog. Control continues after this block.
}
// Original L33: Blank line separates related code sections for readability.

// Original L34: Blank line separates related code sections for readability.

