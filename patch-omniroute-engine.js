/**
 * patch-omniroute-engine.js — Translucid OmniRoute Engine (Crystal Glass + High Contrast Edition)
 * Injeta Liquid Glass Refinado, Alto Contraste de Texto e Apple Native Vibrancy no OmniRoute Desktop
 */
const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '/tmp/omniroute-translucid-build';

if (!targetDir || !fs.existsSync(targetDir)) {
  console.error('❌ Diretório extraído não fornecido ou inexistente:', targetDir);
  process.exit(1);
}

console.log('⚡ Iniciando injeção de Crystal Liquid Glass no OmniRoute em:', targetDir);

// =========================================================================
// 1. Modificar main.js (Janela Electron Transparente com Vibrancy)
// =========================================================================
const mainJsPath = path.join(targetDir, 'main.js');
if (fs.existsSync(mainJsPath)) {
  let mainJs = fs.readFileSync(mainJsPath, 'utf8');

  mainJs = mainJs.replace(
    /backgroundColor:\s*"#0a0a0a",/,
    `backgroundColor: "#00000000",
    transparent: true,
    hasShadow: true,
    opacity: 0.92,`
  );

  mainJs = mainJs.replace(
    /titleBarStyle:\s*"hiddenInset",\s*trafficLightPosition:\s*\{\s*x:\s*16,\s*y:\s*16\s*\}/,
    `titleBarStyle: "hiddenInset",
      trafficLightPosition: { x: 16, y: 16 },
      vibrancy: "under-window",
      visualEffectState: "active"`
  );

  fs.writeFileSync(mainJsPath, mainJs, 'utf8');
  console.log('✅ main.js configurado com transparent: true e vibrancy: under-window.');
}

// =========================================================================
// 2. Modificar preload.js (Injeção de Liquid Glass de Alta Legibilidade)
// =========================================================================
const preloadJsPath = path.join(targetDir, 'preload.js');
if (fs.existsSync(preloadJsPath)) {
  let preloadJs = fs.readFileSync(preloadJsPath, 'utf8');

  // Remove injeção anterior se existir
  preloadJs = preloadJs.replace(/function installOmniLiquidGlass\(\)[\s\S]*?installOmniLiquidGlass\(\);/g, '');

  const liquidGlassInjection = `
function installOmniLiquidGlass() {
  const attach = () => {
    if (!document.head) return;
    const styleId = "omni-translucid-liquid-glass";
    document.getElementById(styleId)?.remove();

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = \`
      :root, html, body {
        background: transparent !important;
        background-color: transparent !important;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif !important;
        -webkit-font-smoothing: antialiased;
      }

      #__next, main, section {
        background-color: transparent !important;
        background: transparent !important;
      }

      /* Elimina fundos pretos sólidos e grades opacas */
      [class*="grid-pattern"], [class*="bg-grid"], svg[class*="grid"], [style*="background-color: rgb(10, 10, 10)"], [style*="background-color: #0a0a0a"] {
        background-color: transparent !important;
        background: transparent !important;
      }

      /* Sidebar & Header com Vidro Translúcido */
      header, nav, aside {
        background: rgba(10, 14, 22, 0.35) !important;
        backdrop-filter: blur(28px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(28px) saturate(180%) !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
      }

      /* Cards com Vidro Cristalino e Densidade de Leitura */
      [class*="card"], [class*="panel"], [class*="border"], table {
        background: rgba(14, 18, 28, 0.45) !important;
        backdrop-filter: blur(24px) saturate(190%) contrast(105%) !important;
        -webkit-backdrop-filter: blur(24px) saturate(190%) contrast(105%) !important;
        border: 1px solid rgba(255, 255, 255, 0.22) !important;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
        border-radius: 12px !important;
      }

      /* Tipografia em Branco Puro Reluzente com Alto Contraste */
      h1, h2, h3, h4, h5, h6, [class*="title"], [class*="font-semibold"], [class*="font-bold"] {
        color: #ffffff !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.90), 0 0 15px rgba(255, 255, 255, 0.20) !important;
      }

      p, span, label, td, th, a, div {
        color: #f1f5f9 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.80);
      }

      /* Inputs, Dropdowns e Botões */
      input, textarea, select {
        background-color: rgba(0, 0, 0, 0.45) !important;
        border: 1px solid rgba(255, 255, 255, 0.25) !important;
        backdrop-filter: blur(18px) !important;
        color: #ffffff !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
      }

      button, [role="button"], [class*="btn"] {
        background-color: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(255, 255, 255, 0.22) !important;
        color: #ffffff !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.80) !important;
      }

      button:hover {
        background-color: rgba(255, 255, 255, 0.16) !important;
        border-color: rgba(255, 255, 255, 0.40) !important;
      }
    \`;
    document.head.appendChild(style);
  };

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", attach, { once: true });
  } else {
    attach();
  }
  window.addEventListener("load", attach);
  setInterval(attach, 1500);
}
installOmniLiquidGlass();
`;

  preloadJs = liquidGlassInjection + '\n' + preloadJs;
  fs.writeFileSync(preloadJsPath, preloadJs, 'utf8');
  console.log('✅ preload.js atualizado com Crystal Liquid Glass + High Contrast.');
}

console.log('🎉 OmniRoute configurado com sucesso!');
