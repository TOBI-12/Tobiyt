import fs from 'fs';
import path from 'path';

const DIR = './mensajes';
const CONFIG_PATH = './config_guardado.json';

// Crear carpeta si no existe
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR);
}

// Crear config
if (!fs.existsSync(CONFIG_PATH)) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ auto: false }, null, 2));
}

let config = JSON.parse(fs.readFileSync(CONFIG_PATH));

// Guardar config
const saveConfig = () => {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
};

// 🔥 Obtener número siguiente
function getNextId() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
  return files.length + 1;
}

// 🔥 Guardar mensaje en archivo individual
function guardarMensaje(msg) {
  const id = getNextId();

  const data = {
    key: msg.key,
    message: msg.message
  };

  const filePath = path.join(DIR, `msg_${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

let handler = async (m, { conn, command, text }) => {

  switch (command) {

    case 'guardar':

      if (text === 'on') {
        config.auto = true;
        saveConfig();
        return m.reply('🟢 Auto guardado ON');
      }

      if (text === 'off') {
        config.auto = false;
        saveConfig();
        return m.reply('🔴 Auto guardado OFF');
      }

      if (!m.quoted) return m.reply('❌ Responde a un mensaje');

      guardarMensaje(m.quoted);

      return m.reply('✅ Guardado en archivo individual');

    case 'reenviar':

      const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));

      if (files.length === 0)
        return m.reply('❌ No hay mensajes');

      for (let file of files) {
        try {
          const data = JSON.parse(fs.readFileSync(path.join(DIR, file)));
          await conn.copyNForward(m.chat, data);
        } catch (e) {
          console.error(e);
        }
      }

      break;

    case 'eliminarmsg':

      const archivos = fs.readdirSync(DIR);

      for (let file of archivos) {
        fs.unlinkSync(path.join(DIR, file));
      }

      return m.reply('🗑️ Todos los archivos eliminados');

    case 'descargarmsg':

      const archivosDescarga = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));

      if (archivosDescarga.length === 0)
        return m.reply('❌ No hay archivos');

      for (let file of archivosDescarga) {
        await conn.sendMessage(m.chat, {
          document: fs.readFileSync(path.join(DIR, file)),
          fileName: file,
          mimetype: 'application/json'
        }, { quoted: m });
      }

      break;
  }
};

handler.command = ['guardar', 'reenviar', 'eliminarmsg', 'descargarmsg'];
export default handler;


// ⚡ AUTO GUARDADO
export async function before(m) {
  if (!config.auto) return;

  try {
    guardarMensaje(m);
  } catch (e) {
    console.error(e);
  }
                     }
