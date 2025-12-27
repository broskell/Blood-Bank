// js/chatbot.js
// Simple floating chatbot for Blood Bank site (no external API)

// Utility: scroll to bottom of messages
function scrollChatToBottom() {
  const container = document.getElementById('chatbotMessages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

// Add a message bubble
function addChatMessage(text, sender = 'bot') {
  const messagesDiv = document.getElementById('chatbotMessages');
  if (!messagesDiv) return;

  const row = document.createElement('div');
  row.className = 'chatbot-message-row ' + sender;

  const bubble = document.createElement('div');
  bubble.className = 'chatbot-message ' + sender;
  bubble.textContent = text;

  row.appendChild(bubble);
  messagesDiv.appendChild(row);
  scrollChatToBottom();
}

// Add welcome message with quick replies
function addWelcomeMessage() {
  const messagesDiv = document.getElementById('chatbotMessages');
  if (!messagesDiv) return;

  messagesDiv.innerHTML = '';

  // Main text
  const row = document.createElement('div');
  row.className = 'chatbot-message-row bot';

  const bubble = document.createElement('div');
  bubble.className = 'chatbot-message bot';
  bubble.innerHTML = `
    Hi, I'm <strong>BloodBankBot</strong>.<br/>
    I can help you with:
    <ul style="margin:4px 0 0 14px; padding:0; font-size:12px;">
      <li>Donor registration</li>
      <li>Hospital blood requests</li>
      <li>Admin / inventory info</li>
    </ul>
  `;

  // Quick replies
  const quickDiv = document.createElement('div');
  quickDiv.className = 'chatbot-quick-replies';
  quickDiv.innerHTML = `
    <button data-topic="donor">Donor help</button>
    <button data-topic="hospital">Hospital help</button>
    <button data-topic="admin">Admin help</button>
    <button data-topic="availability">Blood availability</button>
  `;

  bubble.appendChild(quickDiv);
  row.appendChild(bubble);
  messagesDiv.appendChild(row);

  // Attach listeners to quick reply buttons
  quickDiv.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-topic');
      handleUserMessage(topic, true); // use keyword directly
    });
  });

  scrollChatToBottom();
}

// Simple rule-based reply
function getBotReply(message) {
  const text = message.toLowerCase();

  if (text.includes('donor') || text === 'donor') {
    return (
      "Donor help:\n" +
      "- Go to the Donor Registration page from the homepage.\n" +
      "- Fill your personal details, blood group, and availability.\n" +
      "- Make sure your age is 18 or above.\n" +
      "We validate the form on the client side before submission."
    );
  }

  if (text.includes('hospital') || text.includes('request') || text === 'hospital') {
    return (
      "Hospital help:\n" +
      "- Open the Hospital Portal.\n" +
      "- Login or register with your email.\n" +
      "- Use 'Request Blood Units' to enter blood group, units and reason.\n" +
      "- You can track all your requests and see their status in the 'Track Request Status' tab."
    );
  }

  if (text.includes('admin') || text === 'admin') {
    return (
      "Admin help:\n" +
      "- Login via the Admin Panel using an admin account.\n" +
      "- In 'Manage Inventory', update available units for each blood group.\n" +
      "- In 'Manage Requests', view all hospital requests and set status to Pending, Approved or Rejected."
    );
  }

  if (
    text.includes('availability') ||
    text.includes('stock') ||
    text.includes('blood')
  ) {
    return (
      "Blood availability:\n" +
      "- The homepage shows current blood units per group.\n" +
      "- Data comes from the Firestore 'inventory' collection, managed by the Admin.\n" +
      "- Status is shown as OK, Low or Critical based on units available."
    );
  }

  if (text.includes('contact') || text.includes('emergency')) {
    return (
      "Emergency contact:\n" +
      "- Please use the emergency phone number and email shown at the bottom of the homepage.\n" +
      "- This academic project simulates a real system, so actual blood bank operations are not performed."
    );
  }

  // Default
  return (
    "I'm a simple demo chatbot for this Blood Bank project.\n" +
    "You can ask about: donor, hospital, admin, or blood availability.\n" +
    "Or use the quick buttons at the top of our chat."
  );
}

// Handle send from user
function handleUserMessage(rawText, isKeyword = false) {
  const input = document.getElementById('chatbotInput');
  const text = isKeyword ? rawText : (input.value || '').trim();

  if (!text) return;

  // Show user message
  addChatMessage(text, 'user');

  if (!isKeyword && input) {
    input.value = '';
  }

  // Small delay to simulate thinking
  setTimeout(() => {
    const reply = getBotReply(text);
    addChatMessage(reply, 'bot');
  }, 300);
}

// Toggle chat window visibility
function openChatbot() {
  const win = document.getElementById('chatbotWindow');
  if (win) {
    win.style.display = 'flex';
    win.setAttribute('aria-hidden', 'false');
  }
}

function closeChatbot() {
  const win = document.getElementById('chatbotWindow');
  if (win) {
    win.style.display = 'none';
    win.setAttribute('aria-hidden', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('chatbotToggleBtn');
  const closeBtn = document.getElementById('chatbotCloseBtn');
  const sendBtn = document.getElementById('chatbotSendBtn');
  const input = document.getElementById('chatbotInput');

  if (!toggleBtn || !sendBtn || !input) {
    console.warn('Chatbot elements not found on this page.');
    return;
  }

  // Initial welcome message
  addWelcomeMessage();

  // Toggle open/close
  toggleBtn.addEventListener('click', () => {
    const win = document.getElementById('chatbotWindow');
    if (!win) return;
    if (win.style.display === 'flex') {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeChatbot);
  }

  // Send on button click
  sendBtn.addEventListener('click', () => {
    handleUserMessage();
  });

  // Send on Enter key
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage();
    }
  });
});