let handler = async (m, { conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // Número del owner
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  // Si no es owner ni bot, ignorar
  if (m.sender !== conn.user.jid) return;
    return; // No responde nada
  }

  let tag = '@' + sender.split('@')[0]; // Mención al usuario

  let menu = `
¡𝗛ola! ${tag}
*Soy Zorro-Bot 🦊*
    
╭ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩♡
┊ *👑⃨፝⃕✰INFO - BOT👑⃨፝⃕✰*
┊
┊  🔥 *Menu de trabas* 🔥
┊           By Tobi
┊✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
┊
┊🦠 *Directas para grupo* 🦠
┊
┊❧️ .canal3 
┊❧️ .chamoy
┊❧️ .leve
┊❧️ .iudo
┊❧️ .iudo2
┊❧️ .tori
┊
┊🧪 *Remotos para grupo* 🧪
┊
┊❧️ .canal <Enlace de grupo>
┊❧️ .kill-grupo <Enlace de grupo>
┊❧️ .killgp <enlace del grupo
┊❧️ .crash-iu <enlace del grupo>
┊❧️ .crash-iu2 <enlace del grupo>
┊❧️ .destrabar <enlace del grupo>
┊❧️ .hard <enlace del grupo>
┊
┊🧨 *Trabas directas para Android* 🧨
┊
┊❧️ .salud
┊❧️ .pato
┊❧️ .ñoño (atraso medio según el dispositivo)
┊
┊🕹️ *Trabas remotas para Android* 🕹️
┊
┊❧️ .crash-system2
┊❧️ .force-andro
┊
┊💣 *Trabas directas para iPhone* 💣
┊
┊❧️ .holi
┊❧️ .hello
┊
┊🔬 Laboratorio de trabas 🔬
┊
┊❧️ .doc2 <enlace>|<nombre>.n
┊❧️ .ubicacion2 Título.n
┊❧️ .convite2 <enlace>|<nombre>.n
┊❧️ .canal2 <enlace>|<nombre>|n
┊❧️ .webpage Título.n|Descripción.n
┊
┊💫 Comandos extras 💫
┊
┊❧️ .tagall (menciona a todos los del grupo)
┊❧️ .antiblock (usalo solo en privado) 
┊❧️ .antiblock2 (usalo para grupos)
┊❧️ .vaciar <enlace del grupo>
┊❧️ .grupo-spam <enlace del grupo> 
┊❧️ .update (usalo solo cuando se te indique)
╰꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡
`.trim();

  await conn.sendMessage(m.chat, {
    video: { url: 'https://files.catbox.moe/pqxx0r.mp4' }, // GIF
    gifPlayback: true,
    caption: menu,
    mimetype: 'video/mp4',
    mentions: [sender]
  }, { quoted: m });

  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/4clmb1.mp3' },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'ayuda', 'help'];
handler.group = false;

export default handler;
