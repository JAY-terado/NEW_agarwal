// Import once in the homepage entry. Delegation also supports client-side navigation.
document.addEventListener("click", (event) => {
  const link = event.target instanceof Element && event.target.closest("a[data-ag-media]");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey) return;

  let player;
  if (link.dataset.agMedia === "video") {
    player = document.createElement("video");
    player.controls = true;
    player.playsInline = true;
    player.poster = link.querySelector("img")?.currentSrc || "";
    player.src = link.href;
  } else if (link.dataset.agMedia === "reel") {
    const reel = new URL(link.href);
    if (reel.origin !== "https://www.instagram.com" ||
        !/^\/reel\/[A-Za-z0-9_-]+\/?$/.test(reel.pathname)) return;
    reel.pathname = reel.pathname.replace(/\/?$/, "/embed/");
    player = document.createElement("iframe");
    player.title = link.getAttribute("aria-label") || link.textContent.trim();
    player.allowFullscreen = true;
    player.src = reel.href;
  } else {
    return;
  }

  event.preventDefault();
  player.className = "ag-media-player";
  player.tabIndex = 0;
  link.replaceWith(player);
  player.focus({ preventScroll: true });
  if (player instanceof HTMLVideoElement) {
    player.play().catch(() => { /* Native controls allow a manual retry. */ });
  }
});
