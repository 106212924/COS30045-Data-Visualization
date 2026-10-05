document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      // Toggle accordion open state
      faqItem.classList.toggle('open');

      // Update indicator symbol
      const icon = button.querySelector('.icon');
      if (icon) {
        icon.textContent = faqItem.classList.contains('open') ? '−' : '+';
      }
    });
  });
});