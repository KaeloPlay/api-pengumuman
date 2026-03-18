const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const mapelList = [
    { pelajaran: 'Bahasa Inggris, IPA Biologi, IPA Fisika, Bahasa Indonesia, PJOK' },
    { pelajaran: 'Informatika, Pendidikan Pancasila, Prakarya, PAI, IPA Fisika' },
    { pelajaran: 'Pendidikan Pancasila, IPS, Matematika, PAI' },
    { pelajaran: 'PJOK, Bahasa Indonesia, Informatika, Matematika, Bahasa Inggris' },
    { pelajaran: 'Bahasa Indonesia, IPS' }
];
let pr = 'Belum ada informasi PR untuk esok hari.';
const piketList = [
    { siswa: 'Ahmad, Al Fathir, Amira, Anindiya, Annisa, Ariq, Atila, Tira' },
    { siswa: 'Husna, Cylla, Daffa N., Dafin, Faiz, Firly, Gavyn, Geysa, Umi' },
    { siswa: 'Hazel, Jasmine, Kaelo, Khatir, Kheyla, Azzam, Lolita, M. Daffa, Vidi' },
    { siswa: 'Malihah, Iqbal, Al Daffa, Nur Azani, Nurizq, Rozarro, Nabila, Nafeesha, Zibran' },
    { siswa: 'Namira, Naufal S., Naufal L., Putri, Raden Ayu, Raffael, Sachi, Syahva, Syakira' },
]
let note = 'Belum ada informasi tambahan untuk esok hari.';

function getDayIndex() {
    const now = new Date();
    const jakartaTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    );

    return (jakartaTime.getDay() + 6) % 7;
}

app.get('/api/pengumuman', (req, res) => {
    const todayIndex = getDayIndex();
    let tomorrowIndex;

    const now = new Date();
    const jakartaTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    );

    let tanggalFix;
    const hour = jakartaTime.getHours();
    if (hour >= 7) {
        tomorrowIndex = (todayIndex + 1) % 7;
        const besok = new Date(
            new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
        );
        besok.setDate(besok.getDate() + 1);

        tanggalFix = besok.toLocaleDateString('id-ID');
    } else {
        tomorrowIndex = todayIndex;
        
        tanggalFix = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
        ).toLocaleDateString('id-ID');
    };

    if (tomorrowIndex > 4) {
        return res.status(200).json({
            tanggal: tanggalFix, mapel: 'Liburrrr 🎉', pr: 'Libur oi', piket: 'Piketla sendirik 😭', note: 'Selamat beristirahat!'
        });
    };

    const mapel = mapelList[tomorrowIndex].pelajaran;
    const piket = piketList[tomorrowIndex].siswa;

    res.status(200).json({
        mapel: mapel, pr: pr, piket: piket, note: note
    });
});

app.post('/api/pengumuman', (req, res) => {
    pr = req.body.pr;
    note = req.body.note;
    
    res.status(201).json({
        message: 'Pengumuman berhasil diperbarui.',
    });
});

app.listen(port, () => {
    console.log(`Server berjalan pada port ${port}!`);
});
