

export function confirmDialog(message = 'Are you sure?', confirmText = 'Yes', cancelText = 'Cancel') {
  const returnFocus = document.activeElement;
  const dialog = document.createElement('dialog');
  dialog.className = 'confirm-dialog';
  const text = document.createElement('p');
  text.textContent = message;
  const form = document.createElement('form');
  form.method = 'dialog';
  const cancel = document.createElement('button');
  cancel.type = 'submit';
  cancel.value = 'cancel';
  cancel.textContent = cancelText;
  const confirm = document.createElement('button');
  confirm.type = 'submit';
  confirm.value = 'confirm';
  confirm.textContent = confirmText;
  form.append(cancel, confirm);
  dialog.append(text, form);
  return new Promise(resolve => {
    dialog.addEventListener('close', () => {
      const accepted = dialog.returnValue === 'confirm';
      dialog.remove();
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
      resolve(accepted);
    }, { once: true });
    document.body.append(dialog);
    dialog.showModal();
    cancel.focus();
  });
}
