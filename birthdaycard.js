document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('messageInput');
  const messageCard = document.getElementById('messageCard');
  const userMessage = document.getElementById('userMessage');
  const shareWhatsApp = document.getElementById('shareWhatsApp');
  const downloadBtn = document.getElementById('downloadImageBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      alert("Please fill in both fields.");
      return;
    }

    const combinedMessage = `From: ${name}\n\n${message}`;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('message', message);

    fetch('https://formsubmit.co/ajax/miracleigboanusi@gmail.com', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.success === "true") {
        
        userMessage.textContent = combinedMessage;
        messageCard.classList.remove('hidden');
        form.classList.add('hidden');

        const encodedMsg = encodeURIComponent(combinedMessage);
        shareWhatsApp.href = `https://wa.me/?text=${encodedMsg}`;
      } else {
        alert('Failed to send message. Try again.');
      }
    })
    .catch(() => {
      alert('Error sending message. Please try again later.');
    });
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const cardElement = document.querySelector('.card');

      html2canvas(cardElement, {
        backgroundColor: '#7f77f1',
        scale: 2,
        useCORS: true
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'birthday_card.jpg';
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.click();
      });
    });
  }
});
