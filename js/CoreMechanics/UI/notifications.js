// Shared notification function (used by all specific functions)
function createNotification(message, iconClass = 'fa-info-circle') {
    const container = ensureNotificationContainer();
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas ${iconClass}"></i> ${message}`;
    
    container.appendChild(notification);
    
    // Auto-remove after animation completes
    setTimeout(() => {
      notification.addEventListener('animationend', () => {
        notification.remove();
      });
      notification.classList.add('fade-out');
    }, 3000);
  }
  
  // Your specific functions (now all using the shared system)
  function ensureNotificationContainer() {
    let container = document.querySelector('.notification-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'notification-container';
      document.body.appendChild(container);
    }
    return container;
  }
  
  function saveNotification(message) {
    createNotification(message, 'fa-floppy-o');
  }
  
  function loadNotification(message) {
    createNotification(message, 'fa-disc');
  }
  
  function showNotification(message) {
    createNotification(message, 'fa-trophy');
  }