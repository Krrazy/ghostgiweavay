module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`${client.user.tag} Hazırlandı`)

        setInterval(function () {
            client.user.setActivity(`Krrazy 💖 Ghost Rewards`)
        }, 30000)
    }
}