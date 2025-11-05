// File System Structure
const fileSystem = {
  '~': {
    type: 'directory',
    contents: {
      'Game': {
        type: 'directory',
        contents: {
          'favorites.txt': {
            type: 'file',
            content: `MY FAVORITE GAMES
================

1. League of Legends
   - Genre: MOBA
   - Why I love it: Strategic gameplay, competitive environment, endless skill ceiling
   - Hours played: 1000+

2. Elden Ring
   - Genre: Action RPG / Souls-like
   - Why I love it: Challenging combat, beautiful open world, rich lore
   - Status: Completed multiple times

3. Cyberpunk 2077
   - Genre: Action RPG
   - Why I love it: Immersive storytelling, stunning Night City, character customization
   - Favorite aspect: The deep narrative and choices

4. The Witcher 3
   - Genre: RPG
   - Why I love it: Epic story, memorable characters, vast world to explore

5. Valorant
   - Genre: Tactical FPS
   - Why I love it: Team-based strategy, precise gunplay
`
          },
          'gaming_setup.txt': {
            type: 'file',
            content: `GAMING SETUP
============

Hardware:
- GPU: [Your graphics card]
- CPU: [Your processor]
- RAM: 16GB+
- Monitor: Gaming display with high refresh rate
- Mouse: Gaming mouse with adjustable DPI
- Keyboard: Mechanical keyboard

Peripherals:
- Headset: High-quality gaming headset
- Controller: For RPG games
- Webcam: For streaming

Software:
- Discord: Communication with gaming friends
- Steam: Main gaming platform
- Epic Games: For exclusive titles
`
          }
        }
      },
      'Picture': {
        type: 'directory',
        contents: {
          'gallery.txt': {
            type: 'file',
            content: `MY PHOTO GALLERY
================

Personal Photos
   - Self portraits and casual shots
   - Capturing moments of daily life
   - Experimenting with photography styles

Travel Adventures
   - Trips with friends and family
   - Beautiful landscapes and cityscapes
   - Cultural experiences around Vietnam
   - Beach days and mountain hikes

World Through My Lens
   - Street photography
   - Architecture and urban scenes
   - Nature and wildlife
   - Sunsets and golden hours
   - Night photography in Hanoi

Note: Replace terminal placeholders with actual image paths
   Format: /images/gallery/[category]/[filename].jpg
`
          },
          'locations.txt': {
            type: 'file',
            content: `FAVORITE LOCATIONS
==================

Vietnam:
- Ha Long Bay: Stunning limestone karsts
- Sapa: Mountain terraces and ethnic culture
- Hoi An: Ancient town with lanterns
- Da Lat: Cool mountain city with pine forests
- Phu Quoc: Beautiful beaches and islands

Hanoi Spots:
- Old Quarter: Historic streets and culture
- West Lake: Peaceful waterfront
- Temple of Literature: Ancient architecture
- Train Street: Iconic photo location
`
          }
        }
      },
      'Music': {
        type: 'directory',
        contents: {
          'playlist.txt': {
            type: 'file',
            content: `MY MUSIC PLAYLIST
=================

ROCK / ALTERNATIVE
- Imagine Dragons - Believer, Radioactive, Thunder
- Linkin Park - In The End, Numb, Breaking The Habit
- Twenty One Pilots - Stressed Out, Ride
- The Score - Legend, Unstoppable

POP / R&B
- The Weeknd - Blinding Lights, Starboy, Save Your Tears
- Dua Lipa - Levitating, Don't Start Now
- Billie Eilish - bad guy, everything i wanted

ELECTRONIC / EDM
- Daft Punk - Get Lucky, One More Time, Around The World
- Calvin Harris - Summer, Feel So Close
- Avicii - Wake Me Up, Levels
- Kygo - Firestone, Stole The Show

CHILL / LO-FI
- Study & Relax Playlists
- ChilledCow / Lofi Girl
- Peaceful Piano
- Coffee Shop Jazz

GAMING SOUNDTRACKS
- League of Legends - RISE, POP/STARS
- Cyberpunk 2077 OST
- Elden Ring OST
`
          },
          'concerts.txt': {
            type: 'file',
            content: `CONCERTS & LIVE MUSIC
=====================

Attended:
- [Add your concert experiences]
- [Local music festivals]
- [Live performances]

Dream Concerts:
- Imagine Dragons World Tour
- The Weeknd Live
- Electronic Music Festivals
- Daft Punk (if they reunite!)

Music Venues in Hanoi:
- [Add local venues you enjoy]
`
          }
        }
      },
      'Art': {
        type: 'directory',
        contents: {
          'portfolio.txt': {
            type: 'file',
            content: `ART PORTFOLIO
=============

DRAWING STYLES
- Digital Art: Created on tablet/computer
- Sketching: Pencil and paper traditional art
- Character Design: Original characters and fan art
- Landscapes: Nature and cityscape drawings

TOOLS & SOFTWARE:
- Drawing Tablet: [Your tablet model]
- Software: Photoshop, Procreate, or Clip Studio Paint
- Traditional: Pencils, markers, sketchbooks

INSPIRATION:
- Anime and manga art styles
- Concept art from games
- Contemporary digital artists
- Traditional Vietnamese art

CURRENT PROJECTS:
- Building art portfolio
- Learning new techniques
- Character design series
- Daily sketch practice
`
          },
          'inspiration.txt': {
            type: 'file',
            content: `ART INSPIRATION
===============

FAVORITE ARTISTS

Studio Ghibli
- Masters of animation and storytelling
- Beautiful hand-drawn art
- Emotional and magical worlds
- Films: Spirited Away, Howl's Moving Castle

Ilya Kuvshinov
- Russian digital artist
- Beautiful character portraits
- Soft coloring and lighting
- Strong influence on my style

Kim Jung Gi
- Legendary illustrator (RIP)
- Incredible skill and speed
- No preliminary sketches
- Master of perspective and composition

Other Inspirations:
- WLOP (Wang Ling/Ghost Blade)
- Loish (Lois van Baarle)
- Ross Tran
- Guweiz
- Sakimichan

Art Communities:
- ArtStation
- DeviantArt
- Pixiv
- Instagram art community
`
          }
        }
      },
      'readme.txt': {
        type: 'file',
        content: `WELCOME TO MY PERSONALITY TERMINAL
===================================

This is an interactive Linux-style terminal showcasing my personality,
interests, and hobbies. Navigate through directories to learn more about me!

AVAILABLE DIRECTORIES:
----------------------
Game/     - My favorite games and gaming setup
Picture/  - Photo gallery and travel memories
Music/    - Music playlists and favorite artists
Art/      - Drawing portfolio and artistic inspiration

QUICK START:
-----------
1. Type 'ls' to see all directories
2. Type 'cd [directory]' to enter a folder (e.g., cd Game)
3. Type 'cat [file]' to read file contents
4. Type 'cd ..' to go back to home directory
5. Type 'help' to see all available commands

ENJOY EXPLORING!
`
      }
    }
  }
};

// Terminal State
let currentPath = '~';
let commandHistory = [];
let historyIndex = -1;

// DOM Elements
const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('commandInput');
const terminalOutput = document.querySelector('.terminal-output');

// Focus input on click
terminal.addEventListener('click', () => {
  commandInput.focus();
});

// Command History Navigation
commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      commandInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      commandInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
    } else {
      historyIndex = -1;
      commandInput.value = '';
    }
  }
});

// Command Processing
commandInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const command = commandInput.value.trim();
    if (command) {
      commandHistory.push(command);
      historyIndex = -1;
      executeCommand(command);
    }
    commandInput.value = '';
  }
});

// Execute Command
function executeCommand(command) {
  // Display command
  addOutput(`<div class="command-echo"><span class="prompt">Merlin@personality:${currentPath}$</span> <span class="command-text">${command}</span></div>`);

  const [cmd, ...args] = command.split(' ');
  const arg = args.join(' ');

  switch (cmd.toLowerCase()) {
    case 'help':
      showHelp();
      break;
    case 'ls':
      listDirectory();
      break;
    case 'cd':
      changeDirectory(arg);
      break;
    case 'cat':
      displayFile(arg);
      break;
    case 'tree':
      showTree();
      break;
    case 'clear':
      clearTerminal();
      break;
    case 'exit':
      exitToMainPage();
      break;
    case '':
      break;
    default:
      addOutput(`<div class="output-text">bash: ${cmd}: command not found</div>`);
  }

  scrollToBottom();
}

// Show Help
function showHelp() {
  const helpText = `
<div class="output-text">
<table class="help-table">
  <tr><td>help</td><td>Show this help message</td></tr>
  <tr><td>ls</td><td>List directory contents</td></tr>
  <tr><td>cd [dir]</td><td>Change directory</td></tr>
  <tr><td>cat [file]</td><td>Display file contents</td></tr>
  <tr><td>tree</td><td>Display directory tree structure</td></tr>
  <tr><td>clear</td><td>Clear terminal screen</td></tr>
  <tr><td>exit</td><td>Return to main portfolio page</td></tr>
</table>
</div>`;
  addOutput(helpText);
}

// Exit to Main Page
function exitToMainPage() {
  addOutput('<div class="output-text">Returning to main portfolio page...</div>');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 500);
}

// List Directory
function listDirectory() {
  const currentDir = getCurrentDirectory();
  
  if (!currentDir || !currentDir.contents) {
    addOutput(`<div class="output-text error">Error: Cannot access directory</div>`);
    return;
  }

  const items = Object.entries(currentDir.contents);
  
  if (items.length === 0) {
    addOutput(`<div class="output-text">Directory is empty</div>`);
    return;
  }

  let output = '<div class="dir-listing">';
  
  items.forEach(([name, item]) => {
    const className = item.type === 'directory' ? 'directory' : 'file';
    output += `<div class="dir-item ${className}">${name}</div>`;
  });
  
  output += '</div>';
  addOutput(output);
}

// Change Directory
function changeDirectory(path) {
  if (!path) {
    addOutput(`<div class="output-text error">cd: missing directory argument</div>`);
    return;
  }

  if (path === '..') {
    if (currentPath !== '~') {
      const pathParts = currentPath.split('/');
      pathParts.pop();
      currentPath = pathParts.join('/') || '~';
      updatePrompt();
      // Silent change
    } else {
      addOutput(`<div class="output-text">bash: cd: ${path}: cannot go up</div>`);
    }
    return;
  }

  if (path === '~' || path === '/') {
    currentPath = '~';
    updatePrompt();
    // Silent change
    return;
  }

  const currentDir = getCurrentDirectory();
  
  if (!currentDir || !currentDir.contents) {
    addOutput(`<div class="output-text error">Error: Current directory invalid</div>`);
    return;
  }

  if (currentDir.contents[path] && currentDir.contents[path].type === 'directory') {
    currentPath = currentPath === '~' ? `~/${path}` : `${currentPath}/${path}`;
    updatePrompt();
    // Silent change
  } else if (currentDir.contents[path]) {
    addOutput(`<div class="output-text">bash: cd: ${path}: Not a directory</div>`);
  } else {
    addOutput(`<div class="output-text">bash: cd: ${path}: No such file or directory</div>`);
  }
}

// Display File
function displayFile(filename) {
  if (!filename) {
    addOutput(`<div class="output-text error">cat: missing file argument</div>`);
    return;
  }

  const currentDir = getCurrentDirectory();
  
  if (!currentDir || !currentDir.contents) {
    addOutput(`<div class="output-text error">Error: Cannot access directory</div>`);
    return;
  }

  const file = currentDir.contents[filename];
  
  if (!file) {
    addOutput(`<div class="output-text error">cat: ${filename}: No such file</div>`);
  } else if (file.type === 'directory') {
    addOutput(`<div class="output-text error">cat: ${filename}: Is a directory</div>`);
  } else {
    addOutput(`<div class="file-content"><pre class="output-text">${file.content}</pre></div>`);
  }
}

// Get Current Directory
function getCurrentDirectory() {
  if (currentPath === '~') {
    return fileSystem['~'];
  }

  const pathParts = currentPath.split('/').filter(p => p && p !== '~');
  let current = fileSystem['~'];

  for (const part of pathParts) {
    if (current.contents && current.contents[part]) {
      current = current.contents[part];
    } else {
      return null;
    }
  }

  return current;
}

// Update Prompt
function updatePrompt() {
  document.querySelector('.prompt').textContent = `Merlin@personality:${currentPath}$`;
}

// Add Output to Terminal
function addOutput(html) {
  const outputLine = document.createElement('div');
  outputLine.className = 'output-line';
  outputLine.innerHTML = html;
  terminalOutput.appendChild(outputLine);
}

// Clear Terminal
function clearTerminal() {
  terminalOutput.innerHTML = '';
}

// Scroll to Bottom
function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

// Tree command
function showTree() {
  const root = fileSystem['~'];
  let output = '<div class="output-text">.\n';
  
  function printTree(dir, prefix = '', isLast = true) {
    const entries = Object.entries(dir.contents || {});
    entries.forEach(([name, item], index) => {
      const isLastItem = index === entries.length - 1;
      const connector = isLastItem ? '└──' : '├──';
      const extension = isLastItem ? '    ' : '│   ';
      
      output += `${prefix}${connector} ${name}\n`;
      
      if (item.type === 'directory' && item.contents) {
        printTree(item, prefix + extension, isLastItem);
      }
    });
  }
  
  printTree(root);
  output += '</div>';
  addOutput(output);
}

// Manual command
function showManual(cmd) {
  const manuals = {
    ls: 'ls - list directory contents\n\nSYNOPSIS\n  ls\n\nDESCRIPTION\n  List information about files and directories in the current directory.',
    cd: 'cd - change directory\n\nSYNOPSIS\n  cd [DIRECTORY]\n\nDESCRIPTION\n  Change the current working directory to DIRECTORY.',
    cat: 'cat - concatenate and display files\n\nSYNOPSIS\n  cat [FILE]\n\nDESCRIPTION\n  Display the contents of FILE.',
    pwd: 'pwd - print working directory\n\nSYNOPSIS\n  pwd\n\nDESCRIPTION\n  Print the full pathname of the current working directory.',
    tree: 'tree - list directory tree structure\n\nSYNOPSIS\n  tree\n\nDESCRIPTION\n  List contents of directories in a tree-like format.',
    help: 'help - display available commands\n\nSYNOPSIS\n  help\n\nDESCRIPTION\n  Display a list of available commands with brief descriptions.'
  };
  
  if (!cmd) {
    addOutput('<div class="output-text">What manual page do you want?\nTry: man help</div>');
  } else if (manuals[cmd]) {
    addOutput(`<div class="output-text">${manuals[cmd]}</div>`);
  } else {
    addOutput(`<div class="output-text">No manual entry for ${cmd}</div>`);
  }
}

// History command
function showHistory() {
  if (commandHistory.length === 0) {
    addOutput('<div class="output-text">No commands in history</div>');
    return;
  }
  
  let output = '<div class="output-text">';
  commandHistory.forEach((cmd, index) => {
    output += `${(index + 1).toString().padStart(4, ' ')}  ${cmd}\n`;
  });
  output += '</div>';
  addOutput(output);
}

// Uptime command
const startTime = new Date();
function showUptime() {
  const now = new Date();
  const uptime = Math.floor((now - startTime) / 1000);
  const minutes = Math.floor(uptime / 60);
  const seconds = uptime % 60;
  addOutput(`<div class="output-text">up ${minutes} minutes, ${seconds} seconds</div>`);
}

// Disk usage command
function showDiskUsage() {
  let output = '<div class="output-text">';
  output += 'Filesystem      Size  Used  Avail Use%\n';
  output += '/dev/sda1       100G   45G    55G  45%\n';
  output += '/dev/sdb1       500G  230G   270G  46%\n';
  output += '</div>';
  addOutput(output);
}

// Find command
function findFiles(name) {
  if (!name) {
    addOutput('<div class="output-text">find: missing file name</div>');
    return;
  }
  
  let results = [];
  
  function searchDir(dir, path) {
    Object.entries(dir.contents || {}).forEach(([itemName, item]) => {
      const fullPath = path === '~' ? `~/${itemName}` : `${path}/${itemName}`;
      if (itemName.toLowerCase().includes(name.toLowerCase())) {
        results.push(fullPath);
      }
      if (item.type === 'directory') {
        searchDir(item, fullPath);
      }
    });
  }
  
  searchDir(fileSystem['~'], '~');
  
  if (results.length === 0) {
    addOutput('<div class="output-text">No files found</div>');
  } else {
    addOutput(`<div class="output-text">${results.join('\n')}</div>`);
  }
}

// Grep command
function grepFiles(text) {
  if (!text) {
    addOutput('<div class="output-text">grep: missing search text</div>');
    return;
  }
  
  let results = [];
  
  function searchInFiles(dir, path) {
    Object.entries(dir.contents || {}).forEach(([itemName, item]) => {
      const fullPath = path === '~' ? `~/${itemName}` : `${path}/${itemName}`;
      if (item.type === 'file' && item.content.toLowerCase().includes(text.toLowerCase())) {
        results.push(fullPath);
      } else if (item.type === 'directory') {
        searchInFiles(item, fullPath);
      }
    });
  }
  
  searchInFiles(fileSystem['~'], '~');
  
  if (results.length === 0) {
    addOutput('<div class="output-text">No matches found</div>');
  } else {
    addOutput(`<div class="output-text">${results.join('\n')}</div>`);
  }
}

// Alias command
function showAliases() {
  const output = `<div class="output-text">
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
</div>`;
  addOutput(output);
}

// Environment command
function showEnvironment() {
  const output = `<div class="output-text">
USER=Merlin
HOME=/home/Merlin
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin
PWD=${currentPath}
TERM=xterm-256color
LANG=en_US.UTF-8
</div>`;
  addOutput(output);
}

// Auto-focus on load
window.addEventListener('load', () => {
  commandInput.focus();
  
  // Hide boot screen after animation completes
  setTimeout(() => {
    const bootScreen = document.getElementById('bootScreen');
    if (bootScreen) {
      bootScreen.style.display = 'none';
    }
  }, 4000);
});

console.log('Terminal initialized successfully!');
