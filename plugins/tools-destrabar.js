let handler = async (m, { conn, args }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'
  const botNumber = conn.user?.jid || ''
  const sender = m.sender

  if (sender !== ownerNumber && sender !== botNumber) {
    return m.reply('Este comando solo es para el owner o el bot.')
  }

  if (!args[0]) {
    return m.reply('Pon el enlace del grupo.\n\nUso:\n.destrabar https://chat.whatsapp.com/xxxx')
  }

  const groupLink = args[0]
  const inviteCode = groupLink.split('/')[3]

  const groupInfo = await conn.groupGetInviteInfo(inviteCode).catch(() => null)
  if (!groupInfo) return m.reply('Enlace inválido.')

  const jid = groupInfo.id

  const metadata = await conn.groupMetadata(jid).catch(() => null)
  if (!metadata) return m.reply('El bot no está en ese grupo.')

  let bigText = ''
  for (let i = 0; i < 200; i++) {
    bigText += '🦊\n\n\n\n'
  }

  await conn.sendMessage(jid, { text: bigText })

  m.reply('Enviado correctamente.')
}

handler.command = ['destrabar']
export default handler
