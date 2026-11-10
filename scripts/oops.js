document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const noticeModal = document.getElementById('notice-popover');
  const okButton = document.getElementById('ok-btn');
  
  noticeModal.showPopover();
  
  okButton.addEventListener('click', () => {
    noticeModal.hidePopover();
    body.removeChild(noticeModal);
  });
});