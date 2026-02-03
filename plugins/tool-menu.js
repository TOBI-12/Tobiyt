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
┊❧️ .iudo2
┊❧️ .tori
┊
┊🧪 *Remotos para grupo* 🧪
┊
┊❧️ .canal <Enlace de grupo>
┊❧️ .kill-grupo <Enlace de grupo>
┊❧️ .killgp <enlace del grupo
┊❧️ .destrabar <enlace del grupo>
┊❧️ .hard <enlace del grupo>
┊
┊
┊🕹️ *Trabas remotas para Android* 🕹️
┊
┊❧️ .crash-system2
┊
┊
┊💫 Comandos extras 💫
┊
┊❧️ .vaciar <enlace del grupo>
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
    audio: { url: 'https://files.catbox.moe/gryb45.mp3' },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'ayuda', 'help'];
handler.group = false;

export default handler;
