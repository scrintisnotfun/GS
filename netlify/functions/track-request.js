// Import required modules (if needed)
const fetch = require('node-fetch'); // For sending Discord webhooks

exports.handler = async (event, context) => {
    // Extract request details
    const path = event.path;          // e.g., "/jeje/63"
    const ip = event.headers['client-ip'] || 'Unknown';
    const userAgent = event.headers['user-agent'] || 'Unknown';
    const referrer = event.headers['referer'] || 'Direct';

    // Discord webhook URL (replace with yours)
    const webhookURL = "YOUR_DISCORD_WEBHOOK_URL";

    // Send data to Discord
    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `⚠️ **404 Accessed**: \`${path}\`\n` +
                        `IP: \`${ip}\`\n` +
                        `User Agent: \`${userAgent}\`\n` +
                        `Referrer: \`${referrer}\``,
            }),
        });
    } catch (err) {
        console.error("Failed to send to Discord:", err);
    }

    // Return a 404 response (optional: serve 404.html)
    return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/html' },
        body: '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/404.html" /></head></html>',
    };
};
