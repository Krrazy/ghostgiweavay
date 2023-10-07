const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js')
const ms = require('ms')

module.exports = {
    slash: true,
    cooldown: 10,
    yetki: "Administrator",

    data: new SlashCommandBuilder()
    .setName('başlat')
    .setDescription('Sunucunuzda Çekiliş Başlatın')
    .addChannelOption(option =>
        option 
            .setName('kanal')
            .setDescription('Çekilişin Yapılacağı Kanalı Seç')
            .addChannelTypes(0)
            .setRequired(true)
    )
    .addUserOption(option1 =>
        option1
            .setName('sponsor')
            .setDescription('Çekiliş Sponsorunu Seç')
            .setRequired(true)
    )
    .addStringOption(option2 =>
        option2
            .setName('süre')
            .setDescription('Çekiliş Süresini Gir | Örnek: 1w(1 Hafta)/1d(1 Gün)/1h(1 Saat)/1(1 Dakika)')
            .setRequired(true)
    )
    .addIntegerOption(option3 =>
        option3
            .setName('kazanan-sayısı')
            .setDescription('Çekilişi Kaç Kişi Kazanacağını Gir')
            .setMinValue(1)
            .setMaxValue(10)
            .setRequired(true)
    )
    .addStringOption(option4 =>
        option4
            .setName('ödül')
            .setDescription('Çekiliş Ödülünü Gir')
            .setRequired(true)
    ),
    async execute(client, interaction) {

        let çekilişkanalı = interaction.options.getChannel("kanal")
        let sponsor = interaction.options.getUser("sponsor")
        let çekilişsüresi = interaction.options.getString("süre") 
        let çekilişkazanansayısı = Math.abs(interaction.options.getInteger("kazanan-sayısı"))
        let çekilişödülü = interaction.options.getString("ödül") 
    
        client.giveawaysManager.start(çekilişkanalı, {
            prize: çekilişödülü,
            duration: ms(çekilişsüresi),
            winnerCount: parseInt(çekilişkazanansayısı),
            hostedBy: sponsor || message.author,
            messages: {
                giveaway: "<a:ghost_gw:1156683513815371876> `ÇEKİLİŞ BAŞLADI` <a:ghost_gw:1156683513815371876>",
                giveawayEnded: "<a:ghost_gw:1156683513815371876> `ÇEKİLİŞ BİTTİ` <a:ghost_gw:1156683513815371876>",
                inviteToParticipate: "🎉 Emojisine Basarak **Çekilişe Katılabilirsin**!",
                winMessage: "<:ghost_gtada:1157940850555371591> **Tebrikler** {winners}\n<a:ghost_davetetkazan:1156683480160276550> **{this.prize}** `Ödülünü Kazandınız`\n\n> <a:ghost_uyari:1157790781545918516> *Görevli Kişiler En Yakın Sürede Ödülünü Verecektir Sakin Ol Ve Bekle*",
                dropMessage: "🎉 Katılan İlk Siz Olun",
                drawing: "\n :alarm_clock: **Çekilişin Bitmesine: **{timestamp} \n<:ghost_members:1157790592374423563> Kazanacak Kişi Sayısı: **{this.winnerCount}**",
                embedFooter: "Bitiş Tarihi:",
                noWinner: `<a:ghost_uyari:1157790781545918516> Çekiliş **Katılım Azlığından İptal Edildi**`,
                hostedBy: "\n<a:ghost_dia:1156703800363581462> __Çekiliş Sponsoru__: {this.hostedBy}",
                winners: "<:ghost_members:1157790592374423563> Kazanan",
                endedAt: "Bittiği Tarih:",
                units: {
                    seconds: "Saniye",
                    minutes: "Dakika",
                    hours: "Saat",
                    days: "Gün",
                    weeks: "Hafta",
                    plurals: false
                }
            },
            lastChance: {
              enabled: true,
              content: '⚠️ **KATILMAK İÇİN SON ŞANS** ⚠️',
              threshold: 1500000,
              embedColor: 'Red',
            },
            pauseOptions: {
                isPaused: false,
                content: '<:ghost_stop:1157791381474005192> **ÇEKİLİŞ DURAKLATILDI** <:ghost_stop:1157791381474005192>',
                unPauseAfter: null,
                embedColor: 'Yellow',
                infiniteDurationText: 'Bekleniyor'
            }
        }).then(() => {
            const başarılı = new Discord.EmbedBuilder()
            .setDescription(`Çekiliş ${çekilişkanalı} Kanalında **__Başlatıldı__**`)
            .setColor('Green')
            interaction.reply({ embeds: [başarılı] })
        }).catch(err => {
            const hata = new Discord.EmbedBuilder()
            .setDescription(`Lütfen Çekiliş Süresini **Doğru Formatta** Girin`)
            .setColor('Red')
            if(err.includes('options.duration is not a positive number')) return interaction.reply({ embeds: [hata] })
        })
    }
}