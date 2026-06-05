(function () {
  const CONFIG = window.BOT_CONFIG || {};
  const NAME   = CONFIG.name     || "Prospekto";
  const AVATAR = CONFIG.avatar   || "⚡";
  const GREETING  = CONFIG.greeting    || "Hola, ¿en qué te puedo ayudar?";
  const SYSTEM    = CONFIG.systemPrompt || "";
  const VOICE_ON  = CONFIG.voiceEnabled !== false;

  // ── Inyectar HTML ─────────────────────────────────────────────────────────
  const widget = document.createElement("div");
  widget.id = "chat-widget";
  widget.innerHTML = `
    <button class="chat-toggle" aria-label="Abrir chat" title="Hablar con ${NAME}">
      <span class="chat-toggle__icon">💬</span>
    </button>
    <div class="chat-window" role="dialog" aria-label="Chat con ${NAME}" hidden>
      <div class="chat-header">
        <span class="chat-header__avatar">${AVATAR}</span>
        <div class="chat-header__info">
          <strong>${NAME}</strong>
          <span class="chat-status">En línea</span>
        </div>
        <button class="chat-close" aria-label="Cerrar chat">✕</button>
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input-row">
        ${VOICE_ON ? `<button class="chat-mic" aria-label="Hablar por voz" title="Modo voz">🎤</button>` : ""}
        <input class="chat-input" type="text" placeholder="Escribe tu mensaje..." autocomplete="off" />
        <button class="chat-send" aria-label="Enviar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // ── Referencias ───────────────────────────────────────────────────────────
  const toggleBtn  = widget.querySelector(".chat-toggle");
  const closeBtn   = widget.querySelector(".chat-close");
  const chatWindow = widget.querySelector(".chat-window");
  const messagesEl = widget.querySelector("#chat-messages");
  const inputEl    = widget.querySelector(".chat-input");
  const sendBtn    = widget.querySelector(".chat-send");
  const micBtn     = widget.querySelector(".chat-mic");

  let history   = [];
  let isOpen    = false;
  let isLoading = false;
  let recognition = null;
  let micActive = false;

  // ── Abrir / cerrar ────────────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    chatWindow.hidden = false;
    chatWindow.classList.add("chat-window--open");
    toggleBtn.classList.add("chat-toggle--open");
    inputEl.focus();
    if (history.length === 0) addMessage("bot", GREETING);
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove("chat-window--open");
    toggleBtn.classList.remove("chat-toggle--open");
    setTimeout(() => { chatWindow.hidden = true; }, 280);
  }

  toggleBtn.addEventListener("click", () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener("click", closeChat);

  // ── Mensajes ──────────────────────────────────────────────────────────────
  function addMessage(role, text) {
    const div = document.createElement("div");
    div.className = `chat-msg chat-msg--${role}`;
    div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function addTyping() {
    const div = document.createElement("div");
    div.className = "chat-msg chat-msg--bot chat-msg--typing";
    div.innerHTML = `<div class="chat-bubble"><span></span><span></span><span></span></div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  }

  // ── Enviar mensaje ────────────────────────────────────────────────────────
  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;
    isLoading = true;

    addMessage("user", text);
    history.push({ role: "user", content: text });
    inputEl.value = "";

    const typing = addTyping();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, systemPrompt: SYSTEM }),
      });

      const data = await res.json();
      typing.remove();

      const reply = data.reply || "Lo siento, no pude procesar tu mensaje.";
      addMessage("bot", reply);
      history.push({ role: "assistant", content: reply });

      if (VOICE_ON && micActive) speak(reply);
    } catch {
      typing.remove();
      addMessage("bot", "Hubo un error de conexión. Intenta de nuevo.");
    }

    isLoading = false;
  }

  sendBtn.addEventListener("click", () => sendMessage(inputEl.value));
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });

  // ── Voz: Speech-to-Text ───────────────────────────────────────────────────
  if (VOICE_ON && micBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "es-MX";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        inputEl.value = transcript;
        sendMessage(transcript);
      };

      recognition.onend = () => {
        micActive = false;
        micBtn.classList.remove("chat-mic--active");
      };

      recognition.onerror = () => {
        micActive = false;
        micBtn.classList.remove("chat-mic--active");
      };

      micBtn.addEventListener("click", () => {
        if (micActive) {
          recognition.stop();
        } else {
          micActive = true;
          micBtn.classList.add("chat-mic--active");
          recognition.start();
        }
      });
    } else {
      // Navegador sin soporte de voz
      micBtn.title = "Tu navegador no soporta voz. Usa Chrome.";
      micBtn.style.opacity = "0.4";
      micBtn.disabled = true;
    }
  }

  // ── Voz: Text-to-Speech ───────────────────────────────────────────────────
  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "es-MX";
    utt.rate = 1.05;
    window.speechSynthesis.speak(utt);
  }

  // ── Abrir automáticamente después de 8s si no interactuaron ──────────────
  setTimeout(() => {
    if (!isOpen) openChat();
  }, 8000);
})();
