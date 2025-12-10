// Client-side TypeScript for the home page
console.log('Home page loaded!');

// Example: Add some interactivity
document.addEventListener('DOMContentLoaded', () => {
  const statusIndicator = document.querySelector('.status-indicator');
  if (statusIndicator) {
    statusIndicator.addEventListener('click', () => {
      alert('Status indicator clicked!');
    });
  }
});

