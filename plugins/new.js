import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';
const CONFIG_PATH = './config_guardado.json';

// Crear archivos
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
}

if (!fs.existsSync(CONFIG_PATH)) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ auto: false }, null, 2));
}

// Cargar
const mensajesGuardados = JSON.parse(fs.readFileSync(FILE_PATH));
let config = JSON.parse(fs.readFileSync(CONFIG_PATH));

// Guardar
const saveMensajes = () => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(mensajesGuardados, null, 2));
};

const saveConfig = () => {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
};

// 🔥 FUNCIÓN CLAVE (GUARDADO LIMPIO)
function estructurarMensaje(msg) {
  return {
    key: msg.key,
    message: msg.message
  };
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

      let msg = m.quoted;
      let limpio = estructurarMensaje(msg);

      mensajesGuardados.push(limpio);
      saveMensajes();

      return m.reply('✅ Mensaje guardado correctamente');

    case 'reenviar':

      if (mensajesGuardados.length === 0)
        return m.reply('❌ No hay mensajes');

      for (let msg of mensajesGuardados) {
        try {
          await conn.copyNForward(m.chat, msg);
        } catch (e) {
          console.error(e);
        }
      }

      break;

    case 'eliminarmsg':

      mensajesGuardados.length = 0;
      saveMensajes();

      return m.reply('⛩️ Todo eliminado');

    case 'descargarmsg':

      await conn.sendMessage(m.chat, {
        document: Buffer.from(JSON.stringify(mensajesGuardados, null, 2)),
        fileName: 'mensajes_guardados.json',
        mimetype: 'application/json'
      }, { quoted: m });

      break;
  }
};

handler.command = ['guardar', 'reenviar', 'eliminarmsg', 'descargarmsg'];
export default handler;


// ⚡ AUTO GUARDADO
export async function before(m) {
  if (!config.auto) return;

  try {
    let limpio = estructurarMensaje(m);

    mensajesGuardados.push(limpio);
    saveMensajes();
  } catch (e) {
    console.error(e);
  }
  }
