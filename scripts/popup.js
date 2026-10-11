

export function confirmDialog(message="Are you sure?", confirmText="Yes", denyText="No") {
  const dialog = document.createElement('dialog');
  dialog.className = 'confirm-dialog';
  dialog.innerHTML = `
    <div class="dialog-div">
      <div class="message-div">
        <p>'${message}'</p>
      </div>
      <div class="button-div">
        <button class="form-button" id="confirm-button" type="button">'${confirmText}'</button>
        <button class="form-button" id="deny-button" type="button">'${denyText}'</button>
      </div>
    </div>
  `;
  
  
  
  
}