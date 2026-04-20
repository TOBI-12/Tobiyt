import fs from 'fs'
import path from 'path'

const delay = ms => new Promise(res => setTimeout(res, ms))

let handler = async (m, { conn, command }) => {

  if (command === 'tobios') {
    try {
      // 📂 ruta correcta (sin "/" al inicio)
      let ruta = path.join(process.cwd(), '/Traba/atraso.json')

      let data = fs.readFileSync(ruta, 'utf-8')
      let msg = JSON.parse(data)

      // 🔁 enviar 50 veces
      for (let i = 0; i < 50; i++) {
        await conn.copyNForward(m.chat, msg, true)
        await delay(800) // ⏱️ evita ban (puedes bajar/subir)
      }

      m.reply('✅ Enviado 50 veces')

    } catch (e) {
      console.log(e)
      m.reply('❌ Error al enviar el mensaje (revisa el JSON o la ruta)')
    }
  }
}

handler.command = ['tobios']

export default handler
