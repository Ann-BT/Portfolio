const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 150;

  // Get current section in view
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop - 200 && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  // Check if we're at the bottom of the page
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
    current = 'contact';
  }

  // Update active nav link
  if (current) {
    removeActive();
    const activeLink = document.querySelector(`.ul-list li a[href="#${current}"]`);
    if (activeLink) activeLink.parentElement.classList.add('active');
  }

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .certifications-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #000;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Cyber security", "Front-end Developer", "Vibe Coder"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display='none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const homeContainer = document.querySelector('.home-container');
    if (homeContainer) homeContainer.classList.add('active-reveal');

    const homeNavLink = document.querySelector('.ul-list li a[href="#home"]');
    if (homeNavLink) {
      removeActive();
      homeNavLink.parentElement.classList.add('active');
    }
  }, 1000);
});

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  const certModal = document.getElementById('certModal');
  const certModalImage = document.querySelector('.cert-modal-image');
  const certModalClose = document.querySelector('.cert-modal-close');
  const certViewButtons = document.querySelectorAll('.cert-view-btn');
  
  // Open modal when view button is clicked
  certViewButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const certCard = button.closest('.cert-card');
      const certImage = certCard.querySelector('.cert-image-wrapper img');
      const imageSrc = certImage.getAttribute('src');
      const imageAlt = certImage.getAttribute('alt');
      
      certModalImage.setAttribute('src', imageSrc);
      certModalImage.setAttribute('alt', imageAlt);
      certModal.classList.add('active');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });
  
  // Close modal when close button is clicked
  certModalClose.addEventListener('click', () => {
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close modal when clicking outside the image
  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      certModal.classList.remove('active');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
      certModal.classList.remove('active');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
  
  // Add certifications container to reveal elements
  const certContainer = document.querySelector('.certifications-container');
  if (certContainer) {
    certContainer.classList.add('reveal');
  }
});

// Flip card tap/click functionality for mobile
document.addEventListener('DOMContentLoaded', () => {
  const flipCards = document.querySelectorAll('.flip-card');
  
  flipCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Only apply on touch devices or small screens
      if (window.innerWidth <= 700 || 'ontouchstart' in window) {
        // Toggle active class
        this.classList.toggle('active');
        
        // Close other flip cards
        flipCards.forEach(otherCard => {
          if (otherCard !== this) {
            otherCard.classList.remove('active');
          }
        });
      }
    });
  });
  
  // Close flip cards when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.flip-card')) {
      flipCards.forEach(card => {
        card.classList.remove('active');
      });
    }
  });
});

// EmailJS Configuration
(function() {
  emailjs.init("YzxpNrPgXuJnvhrDu"); // EmailJS Public Key
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const submitButton = contactForm.querySelector('.btn-send');
      const originalButtonText = submitButton.textContent;
      
      // Show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      submitButton.style.opacity = '0.7';
      
      // Send email using EmailJS
      emailjs.sendForm(
        'service_06x8xgy',    // Your Service ID
        'template_jv8c1nj',   // Replace with your Template ID from EmailJS
        contactForm
      )
      .then(function(response) {
        console.log('Email sent successfully!', response.status, response.text);
        
        // Success feedback
        submitButton.textContent = '✓ Message Sent!';
        submitButton.style.backgroundColor = '#10b981';
        submitButton.style.color = '#fff';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(function() {
          submitButton.textContent = originalButtonText;
          submitButton.style.backgroundColor = '';
          submitButton.style.color = '';
          submitButton.style.opacity = '1';
          submitButton.disabled = false;
        }, 3000);
      }, function(error) {
        console.error('Email send failed:', error);
        
        // Error feedback
        submitButton.textContent = '✗ Failed to Send';
        submitButton.style.backgroundColor = '#ef4444';
        submitButton.style.color = '#fff';
        
        // Reset button after 3 seconds
        setTimeout(function() {
          submitButton.textContent = originalButtonText;
          submitButton.style.backgroundColor = '';
          submitButton.style.color = '';
          submitButton.style.opacity = '1';
          submitButton.disabled = false;
        }, 3000);
      });
    });
  }
});