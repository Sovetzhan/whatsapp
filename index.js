const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // <-- заменили библиотеку

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('📤 Сканируй этот QR-код:\n');
    qrcode.generate(qr, { small: true }); // <-- выводим QR-код в терминал
});

client.on('ready', () => {
    console.log('✅ WhatsApp готов');
});

client.on('message', async message => {
    const userMessage = message.body?.toLowerCase()?.trim();

    if (userMessage === 'привет') {
        await message.reply('Привет! Я ваш помощник. Чем могу помочь?');
    }
});

client.initialize();
