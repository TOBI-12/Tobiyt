import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, command }) => {

  if (command === 'tobios') {
    try {
      // 📂 ruta exacta desde raíz
      let ruta = path.join(process.cwd(), 'Tobiyt/Traba/atraso.json')

      let data = fs.readFileSync(ruta, 'utf-8')
      let msg = JSON.parse(data)

      // 🔁 reenviar como mensaje real
      await conn.copyNForward(m.chat, msg, true)

    } catch (e) {
      console.log(e)
      m.reply('❌ Error al enviar el mensaje (revisa el JSON o la ruta)')
    }
  }
}

handler.command = ['tobios']

export default handler
