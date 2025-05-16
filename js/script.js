document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.preview-list a');
  const views = document.querySelectorAll('.full-view');
  const loaderLine = document.querySelector('.progress-line');
  const loaderText = document.querySelector('.loader-text');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent hash-based scrolling

      // Identify which image to show
      const targetId = tab.getAttribute('href').substring(1);
      const targetView = document.getElementById(targetId);

      // Hide all views
      views.forEach(view => {
        view.style.display = 'none';
        view.classList.remove('active');
      });

      // Show and animate selected view
      if (targetView) {
        targetView.style.display = 'flex';
        setTimeout(() => {
          targetView.classList.add('active');
        }, 10);
      }

      // Reset loader
      loaderLine.style.transition = 'none';
      loaderLine.style.width = '0';
      loaderText.style.opacity = '0';

      // Animate loader
      setTimeout(() => {
        loaderLine.style.transition = 'width 1.2s ease-out';
        loaderLine.style.width = '100%';

        // Fade in "Loaded" text after progress
        setTimeout(() => {
          loaderText.style.opacity = '1';
        }, 1200);
      }, 50);
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form[name="screenshot-upload"]');
  const successMsg = document.querySelector('.upload-success');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      body: formData,
    }).then(() => {
      form.reset();
      successMsg.classList.remove('hidden');
    }).catch(() => {
      alert('Something went wrong. Please try again.');
    });
  });
});

const fileInput = document.querySelector('input[type="file"][name="screenshot"]');
const uploadedFileName = document.getElementById('uploaded-file-name');

fileInput?.addEventListener('change', () => {
  const file = fileInput.files[0];
  uploadedFileName.textContent = file ? `✔️ Selected: ${file.name}` : '';
});