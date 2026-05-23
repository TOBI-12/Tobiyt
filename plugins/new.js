import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';
const CONFIG_PATH = './config_guardado.json';

// Crear archivos si no existen
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
}

if (!fs.existsSync(CONFIG_PATH)) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ auto: false }, null, 2));
}

// Cargar datos
let mensajesGuardados = JSON.parse(fs.readFileSync(FILE_PATH));
let config = JSON.parse(fs.readFileSync(CONFIG_PATH));

// Guardar funciones
function saveMensajes() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(mensajesGuardados, null, 2));
}

function saveConfig() {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

let handler = async (m, { conn, command, text }) => {

  switch (command) {

    // 🔘 GUARDAR / AUTO ON-OFF
    case 'guardar':

      if (text === 'on') {
        config.auto = true;
        saveConfig();
        return m.reply('🟢 Guardado automático ACTIVADO');
      }

      if (text === 'off') {
        config.auto = false;
        saveConfig();
        return m.reply('🔴 Guardado automático DESACTIVADO');
      }

      if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres guardar');

      let msg = m.quoted.fakeObj || m.quoted;

      mensajesGuardados.push(msg);
      saveMensajes();

      return m.reply('✅ Mensaje guardado');

    // 🔁 REENVIAR TODOS
    case 'reenviar':

      if (mensajesGuardados.length === 0)
        return m.reply('❌ No hay mensajes guardados');

      for (let msg of mensajesGuardados) {
        try {
          await conn.copyNForward(m.chat, msg);
        } catch (e) {
          console.error(e);
        }
      }

      break;

    // 🗑️ ELIMINAR TODO
    case 'eliminarmsg':

      mensajesGuardados = [];
      saveMensajes();

      return m.reply('🗑️ Mensajes eliminados');

    // 📥 DESCARGAR JSON
    case 'descargarmsg':

      try {
        if (!fs.existsSync(FILE_PATH)) {
          fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
        }

        await conn.sendMessage(m.chat, {
          document: fs.readFileSync(FILE_PATH),
          fileName: 'mensajes_guardados.json',
          mimetype: 'application/json'
        }, { quoted: m });

      } catch (e) {
        console.error(e);
        m.reply('❌ Error al enviar el archivo');
      }

      break;
  }
};

handler.command = ['guardar', 'reenviar', 'eliminarmsg', 'descargarmsg'];
export default handler;


// ⚡ AUTO GUARDADO GLOBAL
export async function before(m) {
  if (!config.auto) return;

  try {
    let msg = m.fakeObj || m;
    mensajesGuardados.push(msg);
    saveMensajes();
  } catch (e) {
    console.error(e);
  }
            }
