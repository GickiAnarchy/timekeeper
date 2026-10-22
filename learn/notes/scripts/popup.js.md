# scripts/popup.js

[Exact copy](../../original/scripts/popup.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text

```

Blank line separates related code sections for readability.

### Line 2

```text

```

Blank line separates related code sections for readability.

### Line 3

```text
export function confirmDialog(message = 'Are you sure?', confirmText = 'Yes', cancelText = 'Cancel') {
```

Exports this reusable UI setup function so the shell can initialize it from another module.

### Line 4

```text
  const returnFocus = document.activeElement;
```

`document.activeElement` (the active element property of document); stores the result in `returnFocus`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 5

```text
  const dialog = document.createElement('dialog');
```

Creates a detached HTML element with tag "dialog"; it is not visible until inserted in the page; stores the result in `dialog`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 6

```text
  dialog.className = 'confirm-dialog';
```

Adds, removes, or selects CSS classes that control this element’s appearance/state.

### Line 7

```text
  const text = document.createElement('p');
```

Creates a detached HTML element with tag "p"; it is not visible until inserted in the page; stores the result in `text`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 8

```text
  text.textContent = message;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 9

```text
  const form = document.createElement('form');
```

Creates a detached HTML element with tag "form"; it is not visible until inserted in the page; stores the result in `form`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
  form.method = 'dialog';
```

Assigns the result of 'dialog' to form.method, updating this control or record for the next step.

### Line 11

```text
  const cancel = document.createElement('button');
```

Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `cancel`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 12

```text
  cancel.type = 'submit';
```

Assigns the result of 'submit' to cancel.type, updating this control or record for the next step.

### Line 13

```text
  cancel.value = 'cancel';
```

Assigns the result of 'cancel' to cancel.value, updating this control or record for the next step.

### Line 14

```text
  cancel.textContent = cancelText;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 15

```text
  const confirm = document.createElement('button');
```

Creates a detached HTML element with tag "button"; it is not visible until inserted in the page; stores the result in `confirm`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 16

```text
  confirm.type = 'submit';
```

Assigns the result of 'submit' to confirm.type, updating this control or record for the next step.

### Line 17

```text
  confirm.value = 'confirm';
```

Assigns the result of 'confirm' to confirm.value, updating this control or record for the next step.

### Line 18

```text
  confirm.textContent = confirmText;
```

Writes user-visible text into the element; textContent avoids treating data as HTML.

### Line 19

```text
  form.append(cancel, confirm);
```

Places the newly built child elements into the document so the user can see them.

### Line 20

```text
  dialog.append(text, form);
```

Places the newly built child elements into the document so the user can see them.

### Line 21

```text
  return new Promise(resolve => {
```

Returns constructs a new instance of `Promise` with a callback taking resolve that runs its enclosed statements to the caller and exits this function.

### Line 22

```text
    dialog.addEventListener('close', () => {
```

Registers a handler so a user action or browser event triggers the page behavior described here.

### Line 23

```text
      const accepted = dialog.returnValue === 'confirm';
```

Checks that `dialog.returnValue` (the return value property of dialog) and "confirm" have the same value and type; stores the result in `accepted`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 24

```text
      dialog.remove();
```

Calls `dialog.remove` with no arguments.

### Line 25

```text
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
```

Checks whether `returnFocus?.isConnected` (the is connected property of returnFocus); optional chaining stops with undefined if a guarded receiver is null or undefined; runs the following statement/block only when truthy.

### Line 26

```text
      resolve(accepted);
```

Calls `resolve` with `accepted` (accepted).

### Line 27

```text
    }, { once: true });
```

Sets the object field once using true. This field is read later through its property name.

### Line 28

```text
    document.body.append(dialog);
```

Places the newly built child elements into the document so the user can see them.

### Line 29

```text
    dialog.showModal();
```

Calls `dialog.showModal` with no arguments.

### Line 30

```text
    cancel.focus();
```

Calls `cancel.focus` with no arguments.

### Line 31

```text
  });
```

Structural punctuation groups or closes the surrounding expression; it marks the boundary of this UI/data block.

### Line 32

```text
}
```

Closes function confirmDialog. Control continues after this block.

### Line 33

```text

```

Blank line separates related code sections for readability.

### Line 34

```text

```

Blank line separates related code sections for readability.
