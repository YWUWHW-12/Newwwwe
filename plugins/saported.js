const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "support",
    alias: ["help", "team"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📑",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
      const status = `╭━━〔${new Date().getHours() < 12 ? '*🌄 සුබ උදෑසනක් 🌄*' : '*🌛 සුබ රාත්‍රියක්  🌛*'}〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *🤠 𝐎𝐰𝐧𝐞𝐫: ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔🐉*
┃◈┃• *🪪 𝐕𝐞𝐫𝐬𝐢𝐨𝐧*:  𝟐.𝟎*
┃◈└───────────┈⊷
╰──────────────┈
*┏━━━━━━━━━━━━━━━━━━━━━*
*┃🐉 TEAM :  ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
*┃🐉 OWNER: 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔🐉*
*┃🐉 NUMBER: +94760698006*
*┃🐉 HELPER: 𝐀𝐃𝐈𝐓𝐇𝐘𝐀 𝐏𝐑𝐄𝐒𝐀𝐃🐉*
*┃🐉 NUMBER: +94702446512*
*┃🐉 HELP WEB: https://queen-hashi-web.vercel.app/qr* 
*┗━━━━━━━━━━━━━━━━━━━━━*
╭━━〔 *𝙌𝙐𝙀𝙀𝙉 𝙃𝘼𝙎𝙃𝙄 𝙈𝘿* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃📑 𝐁𝐎𝐓 𝐑𝐄𝐏𝐎 : https://github.com/laksidunimsara1/QUEEN-HASHI-MD
┃◈┃
┃◈┃📑 𝐁𝐎𝐓 𝐖𝐄𝐁 : https://queen-hashi-web.vercel.app/
┃◈┃
┃◈┃📑 𝐁𝐎𝐓 𝐂𝐇𝐀𝐍𝐄𝐋 : https://whatsapp.com/channel/0029Vao7dOmDOQISArwnHT0e
┃◈┃
┃◈┃📑 𝐎𝐖𝐍𝐄𝐑 𝐍𝐔𝐌 : +94760698006
┃◈└───────────┈⊷
╰──────────────┈⊷
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ
`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: "https://i.ibb.co/zwhqLSQ/20250406-120212.jpg" },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363349375266377@newsletter',
                    newsletterName: '❮❮ 𝑻 𝑯 𝑬 - 𝑫 么 𝑹 𝑲 -𝑲𝑰𝑳𝑳𝑬𝑹 ❯❯',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
