/**
 * patch-omniroute-engine.js — Translucid OmniRoute Engine (Zero Grid + Pure Liquid Glass Edition)
 * Remove 100% dos quadriculados/grades de fundo e aplica Liquid Glass cristalino com alta legibilidade
 */
const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '/tmp/omniroute-translucid-build';

if (!targetDir || !fs.existsSync(targetDir)) {
  console.error('❌ Diretório extraído não fornecido ou inexistente:', targetDir);
  process.exit(1);
}

console.log('⚡ Removendo quadriculado e aplicando Pure Crystal Glass no OmniRoute em:', targetDir);

// =========================================================================
// 1. Modificar main.js (Janela Nativa com Vibrancy Apple Silicon Puro)
// =========================================================================
const mainJsPath = path.join(targetDir, 'main.js');
if (fs.existsSync(mainJsPath)) {
  let mainJs = fs.readFileSync(mainJsPath, 'utf8');

  mainJs = mainJs.replace(
    /backgroundColor:\s*"#0a0a0a",/,
    `backgroundColor: "#00000000",
    transparent: true,
    hasShadow: true,
    opacity: 0.94,`
  );

  mainJs = mainJs.replace(
    /titleBarStyle:\s*"hiddenInset",\s*trafficLightPosition:\s*\{\s*x:\s*16,\s*y:\s*16\s*\}/,
    `titleBarStyle: "hiddenInset",
      trafficLightPosition: { x: 16, y: 16 },
      vibrancy: "under-window",
      visualEffectState: "active"`
  );

  fs.writeFileSync(mainJsPath, mainJs, 'utf8');
  console.log('✅ main.js configurado.');
}

// =========================================================================
// 2. Modificar preload.js (Eliminação Total do body::before Grid)
// =========================================================================
const preloadJsPath = path.join(targetDir, 'preload.js');
if (fs.existsSync(preloadJsPath)) {
  let preloadJs = fs.readFileSync(preloadJsPath, 'utf8');

  // Limpa injeções antigas
  preloadJs = preloadJs.replace(/function installOmniLiquidGlass\(\)[\s\S]*?installOmniLiquidGlass\(\);/g, '');

  const pureCrystalGlassNoGrid = `
function installOmniLiquidGlass() {
  const attach = () => {
    if (!document.head || document.getElementById("omni-translucid-liquid-glass")) return;

    const style = document.createElement("style");
    style.id = "omni-translucid-liquid-glass";
    style.textContent = \`
      :root, html, body {
        background: transparent !important;
        background-color: transparent !important;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif !important;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
      }

      /* 🚫 ELIMINAÇÃO TOTAL DA GRADE / QUADRICULADO DE FUNDO */
      body::before,
      body::after,
      #__next::before,
      #__next::after,
      main::before,
      main::after,
      [class*="grid"]::before,
      [class*="grid"]::after,
      [class*="grid-pattern"],
      [class*="bg-grid"] {
        display: none !important;
        content: none !important;
        background: none !important;
        background-image: none !important;
      }

      #__next, main, section {
        background-color: transparent !important;
        background: transparent !important;
      }

      /* Sidebar & Header Translúcidos com Vidro Cristalino */
      header, nav, aside {
        background: rgba(10, 14, 22, 0.40) !important;
        border-color: rgba(255, 255, 255, 0.14) !important;
        transform: translateZ(0);
      }

      /* Cards Ultra-Fluidos: Vidro Sedoso e Alta Densidade de Leitura */
      [class*="card"], [class*="panel"], [class*="border"], table {
        background: rgba(14, 18, 28, 0.55) !important;
        border: 1px solid rgba(255, 255, 255, 0.20) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
        border-radius: 12px !important;
        transform: translateZ(0);
        contain: paint;
      }

      /* Tipografia em Alto Contraste Nítida */
      h1, h2, h3, h4, h5, h6, [class*="title"], [class*="font-semibold"], [class*="font-bold"] {
        color: #ffffff !important;
        font-weight: 700 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85) !important;
      }

      p, span, label, td, th, a, div {
        color: #f1f5f9 !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
      }

      /* Inputs e Botões com Zero Lag */
      input, textarea, select {
        background-color: rgba(0, 0, 0, 0.45) !important;
        border: 1px solid rgba(255, 255, 255, 0.25) !important;
        color: #ffffff !important;
        transform: translateZ(0);
      }

      button, [role="button"], [class*="btn"] {
        background-color: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(255, 255, 255, 0.20) !important;
        color: #ffffff !important;
        transform: translateZ(0);
        transition: background-color 0.15s ease, border-color 0.15s ease;
      }

      button:hover {
        background-color: rgba(255, 255, 255, 0.18) !important;
        border-color: rgba(255, 255, 255, 0.38) !important;
      }
    \`;
    document.head.appendChild(style);
  };

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", attach, { once: true });
  } else {
    attach();
  }
}
installOmniLiquidGlass();
`;

  preloadJs = pureCrystalGlassNoGrid + '\n' + preloadJs;
  fs.writeFileSync(preloadJsPath, preloadJs, 'utf8');
  console.log('✅ preload.js atualizado: Quadriculado 100% removido.');
}

console.log('🎉 OmniRoute configurado sem quadriculado!');
