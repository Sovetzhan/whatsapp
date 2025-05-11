const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const nodemailer = require('nodemailer');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Настройка почты
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssovetzhanov03@gmail.com',
        pass: 'glua fcga ynrm kgua' // пароль приложения, не обычный!
    }
});

// Обработчик QR-кода
client.on('qr', async (qr) => {
    try {
        console.log('📤 QR код для входа в WhatsApp Web:\n');
        console.log(qr);

        // Генерация изображения QR-кода
        const qrImage = await qrcode.toDataURL(qr);

        // Подготовка и отправка письма
        await transporter.sendMail({
            from: '"WhatsApp Бот" <ssovetzhanov03@gmail.com>',
            to: 's.design4321@gmail.com',
            subject: 'QR-код для входа в WhatsApp',
            html: `<p>Вот ваш QR-код для авторизации в WhatsApp:</p><img src="${qrImage}" alt="QR Code">`
        });

        console.log('📧 QR-код отправлен на почту');
    } catch (error) {
        console.log('❌ Ошибка при отправке QR-кода:', error);
    }
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
