const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

let pr = 'Belum ada pengumuman hari ini.';
let note = 'Tidak ada catatan tambahan hari ini.';

app.get('/api/pengumuman', (req, res) => {
    res.status(200).json({
        pr: pr, note: note
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
