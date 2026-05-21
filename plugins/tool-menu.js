import fs from 'fs'

let handler = async (m, { conn }) => {

let textoMenu = `
¡𝗛ola! ${tag}
*Soy Shisui-bot ⛩️*
    
╭ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩♡
┊ *👑⃨፝⃕✰INFO - BOT👑⃨፝⃕✰*
┊
┊  🔥 *Menu de trabas* 🔥
┊           By Tobi
┊✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
┊
┊🦠 *Directas para grupo* 🦠
┊
┊❧️ .iudo2
┊❧️ .tori
┊
┊🧪 *Remotos para grupo* 🧪
┊
┊❧️ .canal <Enlace de grupo>
┊❧️ .kill-grupo <Enlace de grupo>
┊❧️ .killgp <enlace del grupo
┊❧️ .hard <enlace del grupo>
┊
┊
┊
┊💫 Comandos extras 💫
┊
┊❧️ .vaciar <enlace del grupo>
┊❧️ .update (usalo solo cuando se te indique)
╰꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡
`


await conn.sendMessage(m.chat, {
  image: fs.readFileSync('./media/Grupo.jpg'),
  caption: textoMenu
}, { quoted: m })


await conn.sendMessage(m.chat, {
  audio: fs.readFileSync('./media/audio.mp3'),
  mimetype: 'audio/mpeg',
  ptt: true
}, { quoted: m })

}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú']

export default handler
