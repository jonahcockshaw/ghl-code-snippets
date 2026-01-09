<script>
(function () {
  const targetSelector = ".hl_conversations--message-header-new";
  const buttonId = "deal-closed-btn";
  const inputSelector = 'input[name="contact.deal_closed_link"]';

  function addButton() {
    const container = document.querySelector(targetSelector);
    if (!container) return;

    if (document.getElementById(buttonId)) return;

    const btn = document.createElement("button");
    btn.id = buttonId;
    btn.type = "button";
    btn.textContent = "Deal Pitch Form";
    btn.style.whiteSpace = "nowrap";
    btn.style.height = "36px";
    btn.classList.add(
      "flex",
      "items-center",
      "justify-center",
      "px-3.5",
      "border",
      "border-gray-300",
      "rounded-md",
      "ml-2",
      "text-xs",
      "font-medium",
      "leading-tight",
      "bg-white",
      "hover:bg-gray-50",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-1",
      "focus:ring-primary-500"
    );

    btn.addEventListener("click", () => {
      const input = document.querySelector(inputSelector);
      const link = input ? input.value.trim() : "";

      if (link) {
        window.open(link, "_blank");
      } else {
        alert("No deal link found in this contact's field.");
      }
    });

    container.appendChild(btn);
  }

  addButton();
  const observer = new MutationObserver(addButton);
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>
