const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pinterest",
    alias: ["pinterestdl", "pin", "pins", "pindownload"],
    desc: "Download media from Pinterest",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { args, quoted, from, reply }) => {
    try {
        // Make sure the user provided the Pinterest URL
        if (args.length < 1) {
            return reply('❎ Please provide the Pinterest URL to download from.');
        }

        // Extract Pinterest URL from the arguments
        const pinterestUrl = args[0];

        // Call the new Pinterest download API
        const response = await axios.get(`https://allstars-apis.vercel.app/pinterest?search=${encodeURIComponent(pinterestUrl)}`);

        if (!response.data.status) {
            return reply('❎ Failed to fetch data from Pinterest.');
        }

        const media = response.data.BK9;
        
        // Prepare the caption
        const desc = `*®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚*

*💚DOWNLOAD PINTEREST💚*

*╭━━〔 𝙌𝙐𝙀𝙀𝙉 𝙃𝘼𝙎𝙃𝙄 𝙈𝘿 〕━━┈⊷*
*┃◈╭─────────────·๏*
*┃◈┃•👨‍💻Owner - ${response.data.owner}*
*┃◈┃•👨‍💻 ᴏᴡɴᴇʀ: 𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔*
*┃◈┃•🤖 ʙᴏᴛ ɴᴀᴍᴇ : 𝐐𝐔𝐄𝐄𝐍 𝐇𝐀𝐒𝐇𝐈**
*┃◈┃•📟 ᴘʟᴀᴛғᴏʀᴍ : Linux*
*┃◈└───────────┈⊷*
*╰──────────────┈⊷*
> ㋛︎ ᴘᴏᴡᴇʀᴅ ʙʏ  ᴍʀ  ʟᴀᴋꜱɪᴅᴜ ᶜᵒᵈᵉʳ`;

        // Check if there are any media items
        if (media.length > 0) {
            const videoUrl = media.find(item => item.url.includes('.mp4'))?.url;
            const imageUrl = media.find(item => item.url.includes('.jpg'))?.url;

            // If it's a video, send the video
            if (videoUrl) {
                await conn.sendMessage(from, { video: { url: videoUrl }, caption: "> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚" }, { quoted: mek });
            } 
            // If it's an image, send the image
            else if (imageUrl) {
                await conn.sendMessage(from, { image: { url: imageUrl }, caption: "> ⚜️𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 : ®𝐌𝐑 𝐋𝐀𝐊𝐒𝐈𝐃𝐔 💚" }, { quoted: mek });
            } else {
                reply('❎ No media found.');
            }
        } else {
            reply('❎ No media found.');
        }

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('❎ An error occurred while processing your request.');
    }
});
