/**
 * royal-sprite.js — Reusable RoyalSprite renderer
 * ─────────────────────────────────────────────────────────────
 * Reads sprite coordinates from royal-wedding-atlas.json (embedded
 * inline below so we avoid a fetch on page load).
 *
 * Usage:
 *   RoyalSprite.render("lanterns", "mkr-hero-lanterns")
 *   RoyalSprite.render("peacock-left", "mkr-hero-peacock", { scale: 1.1 })
 *
 * The atlas is NEVER displayed as a full image.
 * Every sprite is rendered via background-image + background-position
 * calculated from the JSON coordinates.
 */

var RoyalSprite = (function () {
  "use strict";

  /* ── Atlas manifest (authoritative — do not edit coordinates) ── */
  var ATLAS = {
    image: "royal-wedding-atlas-final.png",
    size: { width: 2560, height: 2560 },
    sprites: {
      "peacock-left":        { x: 24,   y: 72,   width: 464, height: 367 },
      "peacock-right":       { x: 536,  y: 37,   width: 464, height: 438 },
      "lanterns":            { x: 1048, y: 52,   width: 464, height: 408 },
      "floral-top-left":     { x: 1560, y: 28,   width: 464, height: 455 },
      "floral-top-right":    { x: 2072, y: 44,   width: 464, height: 423 },
      "floral-left-cascade": { x: 81,   y: 536,  width: 349, height: 464 },
      "floral-right-cascade":{ x: 536,  y: 553,  width: 464, height: 430 },
      "floral-branch-left":  { x: 1048, y: 536,  width: 464, height: 464 },
      "floral-branch-right": { x: 1606, y: 536,  width: 371, height: 464 },
      "chhatri-left":        { x: 2090, y: 536,  width: 427, height: 464 },
      "chhatri-right":       { x: 42,   y: 1048, width: 427, height: 464 },
      "arch-frame":          { x: 536,  y: 1065, width: 464, height: 430 },
      "column-floral":       { x: 1094, y: 1048, width: 371, height: 464 },
      "palace-lake":         { x: 1560, y: 1204, width: 464, height: 152 },
      "palace-silhouette":   { x: 2072, y: 1175, width: 464, height: 210 },
      "palace-balcony-right":{ x: 24,   y: 1658, width: 464, height: 267 },
      "floral-ornament":     { x: 536,  y: 1596, width: 464, height: 392 },
      "photo-frame":         { x: 1048, y: 1665, width: 464, height: 254 },
      "ornament-center":     { x: 1560, y: 1692, width: 464, height: 200 },
      "ornament-small":      { x: 2072, y: 1627, width: 464, height: 329 },
      "hanging-tassel":      { x: 24,   y: 2095, width: 464, height: 417 },
      "paper-texture":       { x: 536,  y: 2208, width: 464, height: 191 }
    }
  };

  var ATLAS_W  = ATLAS.size.width;
  var ATLAS_H  = ATLAS.size.height;

  /* Path to the atlas — relative to the page */
  var ATLAS_URL = "royal-wedding-atlas-final.png";

  /**
   * getCSSProps(spriteName, targetWidth)
   * Returns an object with CSS properties that render the sprite
   * at targetWidth pixels wide (height scales proportionally).
   *
   * @param {string} spriteName   — key in ATLAS.sprites
   * @param {number} targetWidth  — desired rendered width in px
   * @returns {{ width, height, backgroundImage, backgroundSize, backgroundPosition }}
   */
  function getCSSProps(spriteName, targetWidth) {
    var sp = ATLAS.sprites[spriteName];
    if (!sp) {
      console.warn("RoyalSprite: unknown sprite \"" + spriteName + "\"");
      return null;
    }

    var scale  = targetWidth / sp.width;
    var w      = sp.width  * scale;
    var h      = sp.height * scale;
    var bgW    = ATLAS_W   * scale;
    var bgH    = ATLAS_H   * scale;
    var bgX    = -(sp.x    * scale);
    var bgY    = -(sp.y    * scale);

    return {
      width:              Math.round(w)   + "px",
      height:             Math.round(h)   + "px",
      backgroundImage:    "url(\"" + ATLAS_URL + "\")",
      backgroundRepeat:   "no-repeat",
      backgroundSize:     Math.round(bgW) + "px " + Math.round(bgH) + "px",
      backgroundPosition: Math.round(bgX) + "px " + Math.round(bgY) + "px"
    };
  }

  /**
   * applyToElement(el, spriteName, targetWidth)
   * Applies sprite CSS directly to an existing DOM element.
   * If targetWidth is 0 or falsy, the call is a no-op (element
   * visibility should be managed by CSS display:none instead).
   */
  function applyToElement(el, spriteName, targetWidth) {
    if (!el || !targetWidth) return;
    var props = getCSSProps(spriteName, targetWidth);
    if (!props) return;

    el.style.width              = props.width;
    el.style.height             = props.height;
    el.style.backgroundImage    = props.backgroundImage;
    el.style.backgroundRepeat   = props.backgroundRepeat;
    el.style.backgroundSize     = props.backgroundSize;
    el.style.backgroundPosition = props.backgroundPosition;
    el.setAttribute("data-sprite", spriteName);
  }

  /**
   * render(spriteName, className, opts)
   * Finds ALL elements with the given className and applies the sprite.
   *
   * opts.width    — target width in px (required)
   * opts.mobileWidth — optional override for mobile (≤ 767px)
   */
  function render(spriteName, className, opts) {
    opts = opts || {};
    var els = document.querySelectorAll("." + className);
    if (!els.length) return;

    var isMobile = window.innerWidth <= 767;
    var w = (isMobile && opts.mobileWidth) ? opts.mobileWidth : (opts.width || 200);

    els.forEach(function (el) {
      applyToElement(el, spriteName, w);
    });
  }

  /**
   * renderAll(definitions)
   * Batch-render all sprites from a definition array.
   *
   * Each entry: { sprite, className, width, mobileWidth }
   */
  function renderAll(definitions) {
    definitions.forEach(function (def) {
      render(def.sprite, def.className, {
        width:       def.width,
        mobileWidth: def.mobileWidth
      });
    });
  }

  /**
   * createEl(spriteName, targetWidth, extraClasses)
   * Creates a new <div> element with sprite CSS applied.
   * Useful for programmatically injected decorations.
   */
  function createEl(spriteName, targetWidth, extraClasses) {
    var el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    applyToElement(el, spriteName, targetWidth);
    if (extraClasses) {
      extraClasses.split(" ").forEach(function (cls) {
        if (cls) el.classList.add(cls);
      });
    }
    return el;
  }

  /* Public API */
  return {
    getCSSProps:    getCSSProps,
    applyToElement: applyToElement,
    render:         render,
    renderAll:      renderAll,
    createEl:       createEl,
    sprites:        Object.keys(ATLAS.sprites)
  };

})();
