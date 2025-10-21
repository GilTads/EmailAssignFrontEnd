// ==============================
// src/boot/phoneConfig.js
// ==============================
// Importa o JSON em build-time e exporta como "config"
// Assim, em qualquer lugar você pode: import { config } from 'src/boot/phoneConfig'
import phones from 'src/assets/phones.json'
export const config = Object.freeze(phones)
