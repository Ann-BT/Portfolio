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

// Terminal Emulator Functionality
document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  
  if (!terminalInput || !terminalBody) return;

  let commandHistory = [];
  let historyIndex = -1;
  let currentPath = '~';

  // AI Chatbot state
  let chatbotMode = false;
  let chatHistory = [];

  // File system structure
  const fileSystem = {
    '~': {
      type: 'directory',
      contents: {
        'about.txt': { type: 'file', content: 'Cybersecurity Student & Developer\nPassionate about security, AI, and gaming.\nLocation: Ha Noi, Viet Nam' },
        'skills.txt': { type: 'file', content: 'Languages: HTML, CSS, JavaScript, Python, Java, C\nTools: Wireshark, nmap, Metasploit\nSkills: Ethical Hacking, Digital Forensics, Network Security' },
        'contact.txt': { type: 'file', content: 'Email: anbt.personal@gmail.com\nLinkedIn: linkedin.com/in/ann-bt/\nGitHub: github.com/Ann-BT' }
      } 
    }
  };

  const commands = {
    help: {
      description: 'Show all available commands',
      execute: () => {
        return `<span class="terminal-info">Available Commands:</span>
  <span class="terminal-success">help</span>     - Show this help message
  <span class="terminal-success">ls</span>       - List files in current directory
  <span class="terminal-success">cat</span>      - Display file contents
  <span class="terminal-success">clear</span>    - Clear terminal screen
  <span class="terminal-success">dark</span>     - Enable dark mode
  <span class="terminal-success">light</span>    - Enable light mode
  <span class="terminal-success">home</span>     - Navigate to home section
  <span class="terminal-success">about</span>    - Navigate to about section
  <span class="terminal-success">project</span>  - Navigate to projects section
  <span class="terminal-success">cert</span>     - Navigate to certifications
  <span class="terminal-success">contact</span>  - Navigate to contact section
  <span class="terminal-success">chatbot</span>  - Chat with Merlin AI
  <span class="terminal-success">exit</span>     - Exit chatbot mode`;
      }
    },
    ls: {
      description: 'List directory contents',
      execute: () => {
        const dir = fileSystem[currentPath];
        if (dir && dir.type === 'directory') {
          const contents = Object.keys(dir.contents).map(item => {
            const itemData = dir.contents[item];
            const color = itemData.type === 'directory' ? 'terminal-info' : 'terminal-text';
            return `<span class="${color}">${item}</span>`;
          }).join('  ');
          return contents || '<span class="terminal-text">Empty directory</span>';
        }
        return '<span class="terminal-error">Not a directory</span>';
      }
    },
    cat: {
      description: 'Display file contents',
      execute: (args) => {
        if (!args[0]) return '<span class="terminal-error">Usage: cat [filename]</span>';
        const dir = fileSystem[currentPath];
        const file = dir?.contents?.[args[0]];
        if (file && file.type === 'file') {
          return `<span class="terminal-text">${file.content.replace(/\n/g, '<br>')}</span>`;
        }
        return `<span class="terminal-error">cat: ${args[0]}: No such file</span>`;
      }
    },
    clear: {
      description: 'Clear terminal',
      execute: () => {
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        terminalBody.innerHTML = '';
        if (inputLine) {
          terminalBody.appendChild(inputLine);
        }
        return null;
      }
    },
    home: {
      description: 'Navigate to home section',
      execute: () => {
        scrollToSection('home');
        return '<span class="terminal-success">Navigating to Home section...</span>';
      }
    },
    about: {
      description: 'Navigate to about section',
      execute: () => {
        scrollToSection('about');
        return '<span class="terminal-success">Navigating to About section...</span>';
      }
    },
    project: {
      description: 'Navigate to projects section',
      execute: () => {
        scrollToSection('project');
        return '<span class="terminal-success">Navigating to Projects section...</span>';
      }
    },
    cert: {
      description: 'Navigate to certifications section',
      execute: () => {
        scrollToSection('certifications');
        return '<span class="terminal-success">Navigating to Certifications section...</span>';
      }
    },
    contact: {
      description: 'Navigate to contact section',
      execute: () => {
        scrollToSection('contact');
        return '<span class="terminal-success">Navigating to Contact section...</span>';
      }
    },
    dark: {
      description: 'Enable dark mode',
      execute: () => {
        document.body.classList.add('dark-mode');
        return `<span class="terminal-success">Dark mode enabled</span>`;
      }
    },
    light: {
      description: 'Enable light mode',
      execute: () => {
        document.body.classList.remove('dark-mode');
        return `<span class="terminal-success">Light mode enabled</span>`;
      }
    },
    chatbot: {
      description: 'Start AI assistant',
      execute: () => {
        chatbotMode = true;
        return `<span class="terminal-success">🧙‍♂️ Merlin AI Awakened!</span>
<span class="terminal-info">Hello! I'm Merlin, the All knowing. What do you want to know about Ann? </span>

<span class="terminal-text">Type 'exit' to return to terminal mode.</span>`;
      }
    },
    exit: {
      description: 'Exit chatbot mode',
      execute: () => {
        if (chatbotMode) {
          chatbotMode = false;
          return '<span class="terminal-success">Exited AI Assistant mode</span>';
        }
        return '<span class="terminal-text">Use this command to exit chatbot mode</span>';
      }
    }
  };

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  }

  // Hugging Face API Configuration
  const HF_API_TOKEN = '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';
  const HF_MODEL = 'openai/gpt-oss-safeguard-20b';
  
  async function simulateAIResponse(userInput) {
    const input = userInput.toLowerCase();
    
    // Portfolio context for Trường An
    const portfolioContext = `You are Merlin, a wise and helpful AI assistant for Trường An's portfolio website. 

Here's information about Trường An:
- Name: Trường An (also known as Ann-BT)
- Education: Third-year Computer Science student at USTH (University of Science and Technology of Hanoi), focusing on Cybersecurity
- Skills: Cybersecurity (ethical hacking, penetration testing, digital forensics), programming (Python, JavaScript, Java, C, Assembly), web development (HTML, CSS)
- Tools: Wireshark, nmap, Metasploit
- Languages: Vietnamese, English, French, Chinese
- Projects: Portfolio Website, Word Chain Game (network programming)
- Certifications: Coursera certifications, Frontend Development, IT certifications
- Contact: anbt.personal@gmail.com
- GitHub: https://github.com/Ann-BT
- LinkedIn: https://www.linkedin.com/in/ann-bt/
- Location: Hanoi, Vietnam
- Interests: AI, gaming (League of Legends, Elden Ring, Cyberpunk 2077), art, music
- Goals: Seeking opportunities in cybersecurity and AI fields

You can answer BOTH questions about Trường An AND any general knowledge questions about anything in the world.
When answering about Trường An, use the information above. For other questions, provide helpful, accurate information.
Keep your responses concise and friendly. You are knowledgeable like the wizard Merlin!`;

    // Create the full prompt
    const fullPrompt = `${portfolioContext}\n\nUser: ${userInput}\n\nMerlin:`;

    try {
      // Use Hugging Face Inference API for DeepSeek-R1
      const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HF_API_TOKEN}`
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false
          }
        })
      });

      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data) && data[0]?.generated_text) {
        // Extract just the response part, removing the prompt
        let responseText = data[0].generated_text;
        
        // Clean up the response if needed
        responseText = responseText.trim();
        
        return responseText;
      } else if (data.error) {
        console.error('Hugging Face API error:', data.error);
        
        // Check if model is loading
        if (data.error.includes('loading')) {
          return '🔮 The AI model is currently loading. This may take 20-30 seconds on first use. Please try again in a moment!';
        }
        
        return `I apologize, but I encountered an error: ${data.error}. Please try again.`;
      } else if (data[0]?.error) {
        console.error('Hugging Face API error:', data[0].error);
        return `I apologize, but I encountered an error: ${data[0].error}. Please try again.`;
      }
    } catch (error) {
      console.error('Hugging Face API error:', error);
      return 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again in a moment.';
    }

    // Fallback (shouldn't reach here)
    return 'I\'m Merlin, I can answer questions about Trường An\'s portfolio or any general knowledge questions. Please try asking your question again!';
  }

  function addOutput(text, addPrompt = true) {
    if (text === null) return; // For clear command
    
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (addPrompt) {
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = chatbotMode ? '🧙‍♂️ Merlin:' : 'Merlin@Portfolio:~$';
      line.appendChild(prompt);
    }
    
    const output = document.createElement('span');
    output.className = 'terminal-text';
    output.innerHTML = text;
    line.appendChild(output);
    
    terminalBody.insertBefore(line, terminalBody.querySelector('.terminal-input-line'));
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  async function processCommand(input) {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add command to history
    commandHistory.push(trimmedInput);
    historyIndex = commandHistory.length;

    // Display the command
    addOutput(trimmedInput, true);

    // Handle chatbot mode
    if (chatbotMode && trimmedInput.toLowerCase() !== 'exit') {
      // Show thinking indicator
      addOutput('<span class="terminal-info">🔮 Merlin is thinking...</span>', false);
      
      const response = await simulateAIResponse(trimmedInput);
      
      // Remove thinking indicator
      const lines = terminalBody.querySelectorAll('.terminal-line');
      if (lines.length > 0) {
        lines[lines.length - 1].remove();
      }
      
      addOutput(response, false);
      return;
    }

    // Parse command and arguments
    const parts = trimmedInput.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Execute command
    if (commands[command]) {
      const output = commands[command].execute(args);
      if (output !== null) {
        addOutput(output, false);
      }
    } else {
      addOutput(`<span class="terminal-error">Command not found: ${command}. Type 'help' for available commands.</span>`, false);
    }
  }

  // Handle Enter key
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = terminalInput.value;
      processCommand(input);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  // Keep terminal input focused when clicking on terminal body
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Auto-focus on terminal input
  terminalInput.focus();
});