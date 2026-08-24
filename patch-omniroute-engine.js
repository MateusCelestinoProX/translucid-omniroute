/**
 * patch-omniroute-engine.js — Translucid OmniRoute Engine (120 FPS ProMotion Edition)
 * Aceleração por Hardware Metal, Remoção de Repaints Pesados e Fluidez Absoluta
 */
const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || '/tmp/omniroute-translucid-build';

if (!targetDir || !fs.existsSync(targetDir)) {
  console.error('❌ Diretório extraído não fornecido ou inexistente:', targetDir);
  process.exit(1);
}

console.log('⚡ Otimizando OmniRoute para 120 FPS ProMotion em:', targetDir);

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
  console.log('✅ main.js configurado com aceleração nativa.');
}

// =========================================================================
// 2. Modificar preload.js (CSS Otimizado Zero-Lag, Sem setInterval, 120 FPS)
// =========================================================================
const preloadJsPath = path.join(targetDir, 'preload.js');
if (fs.existsSync(preloadJsPath)) {
  let preloadJs = fs.readFileSync(preloadJsPath, 'utf8');

  // Limpa injeções antigas
  preloadJs = preloadJs.replace(/function installOmniLiquidGlass\(\)[\s\S]*?installOmniLiquidGlass\(\);/g, '');

  const highPerformanceGlass = `
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

      #__next, main, section {
        background-color: transparent !important;
        background: transparent !important;
      }

      /* Elimina fundos pretos sólidos e grades pesadas */
      [class*="grid-pattern"], [class*="bg-grid"], svg[class*="grid"], [style*="background-color: rgb(10, 10, 10)"], [style*="background-color: #0a0a0a"] {
        background-color: transparent !important;
        background: transparent !important;
      }

      /* Sidebar & Header Translúcidos - GPU Layering */
      header, nav, aside {
        background: rgba(10, 14, 22, 0.40) !important;
        border-color: rgba(255, 255, 255, 0.14) !important;
        transform: translateZ(0);
      }

      /* Cards Ultra-Fluidos: Fundo óptico translúcido sem recalcular blur a cada frame */
      [class*="card"], [class*="panel"], [class*="border"], table {
        background: rgba(14, 18, 28, 0.55) !important;
        border: 1px solid rgba(255, 255, 255, 0.20) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35) !important;
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

  preloadJs = highPerformanceGlass + '\n' + preloadJs;
  fs.writeFileSync(preloadJsPath, preloadJs, 'utf8');
  console.log('✅ preload.js otimizado para 120 FPS sem intervalos redundantes.');
}

console.log('🎉 Otimização ProMotion 120 FPS concluída!');
