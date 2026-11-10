document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const noticeModal = document.getElementById('notice-popover');
  const okButton = document.getElementById('ok-btn');
  
  
  
  okButton.addEventListener('click', () => {
    noticeModal.hidePopover();
    body.removeChild(noticeModal);
  });
});