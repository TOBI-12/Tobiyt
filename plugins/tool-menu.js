let handler = async (m, { conn }) => {
  const sender = m.sender;

  // Solo el bot puede usarlo
  if (sender !== conn.user.jid) return;

  let tag = '@' + sender.split('@')[0];

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
┊❧️ .hard <enlace del grupo>
┊
┊
┊
┊💫 Comandos extras 💫
┊
┊❧️ .vaciar <enlace del grupo>
┊❧️ .update (usalo solo cuando se te indique)
╰꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡
`.trim();

  // Video
  await conn.sendMessage(m.chat, {
    video: { url: 'https://files.catbox.moe/pqxx0r.mp4' },
    gifPlayback: true,
    caption: menu,
    mimetype: 'video/mp4',
    mentions: [sender]
  }, { quoted: m });

  // Audio (nota de voz REAL)
  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/tu-audio.ogg' },
    mimetype: 'audio/ogg; codecs=opus',
    ptt: true
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'ayuda', 'help'];
handler.group = false;

export default handler;
