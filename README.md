# 🪟💎 Translucid OmniRoute

> Transforme o **OmniRoute Desktop (Electron + Next.js)** em uma experiência de **Vidro Cristalino Líquido (Crystal Liquid Glass & Apple Native Vibrancy)** com alto contraste e legibilidade no macOS.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform: macOS](https://img.shields.io/badge/Platform-macOS%20(Apple%20Silicon%20%26%20Intel)-black.svg)](https://apple.com)
[![Electron: Native Glass](https://img.shields.io/badge/Electron-Vibrancy%20%26%20Alpha-emerald.svg)](https://electronjs.org)

---

## 📖 Visão Geral

O **OmniRoute Desktop** é o gateway soberano de roteamento de IA. Por padrão, ele possui uma interface com painéis de cores sólidas pretas e quadriculadas.

O **Translucid OmniRoute** aplica um patch cirúrgico no pacote `.asar` do aplicativo que:
1. Desbloqueia o canal Alpha nativo do macOS (`vibrancy: "under-window"`, `transparent: true`, `opacity: 0.92`).
2. Transforma todos os cards de provedores e painéis laterais em **vidro líquido cristalino** com bordas finas de luz (`rgba(255, 255, 255, 0.22)`).
3. **Maximiza a Legibilidade:** Aplica branco puro reluzente (`#ffffff`), tipografia com micro-sombra de alto relevo (`text-shadow`) e fundo com densidade óptica para que os textos nunca briguem com o que estiver posicionado atrás da janela.

---

## ⚡ Como Aplicar com 1 Comando (Automático)

Abra o Terminal no diretório do projeto e execute:

```bash
chmod +x apply-translucid-omniroute.sh restore-original-omniroute.sh
./apply-translucid-omniroute.sh
```

O script automaticamente:
1. Encerra qualquer instância em execução do OmniRoute.
2. Cria um backup seguro do arquivo original (`app.asar.backup`).
3. Extrai o pacote de recursos com `@electron/asar`.
4. Injeta as diretivas de janela transparente e estilos de Crystal Liquid Glass de alta legibilidade.
5. Reempacota o aplicativo e o reinicia instantaneamente.

---

## 🔄 Como Restaurar para a Versão Padrão de Fábrica

Se desejar retornar ao visual original sólido do OmniRoute a qualquer momento:

```bash
./restore-original-omniroute.sh
```

---

## ❓ Perguntas Frequentes (FAQ)

### 1. Se eu desligar ou reiniciar o Mac, o visual volta ao padrão?
> **Não!** As alterações são gravadas de forma permanente no arquivo binário `app.asar` dentro de `/Applications/OmniRoute.app`. O efeito translúcido **permanece ativo e intacto indefinidamente**.

### 2. Se o OmniRoute receber uma atualização, volta ao padrão?
> **Sim.** Quando o aplicativo recebe um update oficial, o instalador substitui o arquivo `app.asar` pelo novo. 
> **Solução:** Basta rodar `./apply-translucid-omniroute.sh` para aplicar a transparência na nova versão em menos de **10 segundos**!

### 3. As chamadas de API, roteamento e tokens são afetados?
> **Não, 100% intactos.** O patch atua exclusivamente nas camadas de apresentação visual (instanciação da janela `BrowserWindow` do Electron e folha de estilos CSS injetada via `preload.js`). Todas as rotas de IA, chaves de API e balanceamento funcionam com performance máxima.

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).
