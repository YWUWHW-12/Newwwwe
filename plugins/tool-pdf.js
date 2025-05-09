const { cmd } = require('../command');
const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');
const { readEnv } = require('../lib/database');

cmd({
    pattern: "topdf",
    alias: "pdf",
    desc: "Convert provided text to a PDF file.",
    react: "📄",
    category: "utilities",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Config එකෙන් LANGUAGE කියවනවා
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';

        // භාෂාව අනුව පණිවිඩ
        const messages = {
            sinhala: {
                noText: "කරුණාකර PDF බවට පරිවර්තනය කිරීමට අවශ්‍ය පෙළ ලබා දෙන්න",
                caption: `
*📄 PDF සාර්ථකව නිර්මාණය කරන ලදී!*

> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔🩵`,
                error: (e) => `දෝෂයක්: ${e.message}`
            },
            english: {
                noText: "Please provide the text you want to convert to PDF",
                caption: `
*📄 𝐏𝐃𝐅 𝐜𝐫𝐞𝐚𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐮𝐥𝐥𝐲!*

> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔🩵`,
                error: (e) => `Error: ${e.message}`
            }
        };

        const msg = messages[language] || messages.english; // භාෂාව හමු නොවුණොත් ඉංග්‍රීසි default ලෙස

        if (!q) return reply(msg.noText);

        // Create a new PDF document
        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfData = Buffer.concat(buffers);

            // Send the PDF file
            await conn.sendMessage(from, {
                document: pdfData,
                mimetype: 'application/pdf',
                fileName: '𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔🩵',
                caption: msg.caption
            }, { quoted: mek });
        });

        // Add text to the PDF
        doc.text(q);

        // Finalize the PDF and end the stream
        doc.end();

    } catch (e) {
        console.error(e);
        const env = await readEnv();
        const language = env.LANGUAGE ? env.LANGUAGE.toLowerCase() : 'english';
        const msg = messages[language] || messages.english;
        reply(msg.error(e));
    }
});
