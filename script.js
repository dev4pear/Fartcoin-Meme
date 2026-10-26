(function () {
  const cfg = window.SITE || {};
  const ca = (cfg.ca || "CommingSoon").trim();
  const launched = !!cfg.launched && !/^comm?ing\s*soon$/i.test(ca) && ca.length > 20;
  const buyUrl = launched
    ? (cfg.buyBase || "https://jup.ag/swap/SOL-") + encodeURIComponent(ca)
    : "#";

  document.querySelectorAll(".js-ca").forEach((el) => { el.textContent = ca; });
  document.querySelectorAll(".js-ca-short").forEach((el) => {
    el.textContent = launched ? ca.slice(0, 4) + "…" + ca.slice(-4) : "Coming Soon";
  });
  document.querySelectorAll(".js-chain").forEach((el) => { el.textContent = cfg.chain || "Solana"; });

  document.querySelectorAll(".js-x").forEach((el) => {
    el.href = cfg.x || "https://x.com/";
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll(".js-social").forEach((el) => {
    el.href = cfg.social || "https://x.com/crypto_banter/status/2114613308217004322";
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll(".js-buy").forEach((el) => {
    if (launched) {
      el.href = buyUrl;
      el.target = "_blank";
      el.rel = "noopener";
      el.removeAttribute("aria-disabled");
      el.classList.remove("is-disabled");
    } else {
      el.href = "#";
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-disabled");
      el.addEventListener("click", (e) => e.preventDefault());
      if (el.tagName === "A") el.textContent = "Buy · Coming Soon";
    }
  });

  const hint = document.querySelector(".js-buy-hint");
  if (hint) {
    hint.textContent = launched
      ? "Buy routes to Jupiter with this mint."
      : "Buy unlocks when a real Solana CA is published.";
  }

  const copyBtn = document.getElementById("copy");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(ca);
        copyBtn.textContent = "Copied";
        setTimeout(() => { copyBtn.textContent = "Copy CA"; }, 1400);
      } catch (_) {
        copyBtn.textContent = "Failed";
        setTimeout(() => { copyBtn.textContent = "Copy CA"; }, 1400);
      }
    });
  }
})();
