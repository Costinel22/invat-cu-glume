const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const PORT = 5000;
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use(cors({
    origin: [
        'http://localhost:3000', // Frontend local
        'http://localhost:5173',
        'https://numele-tau.netlify.app' // Înlocuiește cu adresa reală Netlify
    ],
    credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data:; connect-src 'self' http://localhost:5000; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self' https: data:"
    );
    next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
    res.json({ message: "CORS merge!" });
});


const avatarsDir = path.join(__dirname, 'avatars');
if (!fs.existsSync(avatarsDir)) fs.mkdirSync(avatarsDir);
app.get("/cors-test", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ msg: "Funcționează CORS" });
});




const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, avatarsDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        cb(null, name);
    }
});
const upload = multer({ storage });

const users = [
    { email: "test@example.com", password: "123456", avatar: "avatar1.png" }
];

// SIGNUP
app.post("/signup", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    const { email, password, avatar } = req.body;
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ message: "Utilizatorul există deja" });
    }
    const newUser = { email, password, avatar: avatar || null };
    users.push(newUser);

    const token = jwt.sign({ email }, "secretul-meu", { expiresIn: "1h" });
    res.status(201).json({ token, avatar: newUser.avatar });
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Email sau parolă incorectă" });
    }

    const token = jwt.sign({ email }, "secretul-meu", { expiresIn: "1h" });

    // ✅ Setează cookie HTTP Only
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, // IMPORTANT pe Netlify (HTTPS)
        sameSite: "None", // IMPORTANT pentru cross-origin
        maxAge: 60 * 60 * 1000 // 1 oră
    }).json({ avatar: user.avatar });
});

// UPLOAD AVATAR
app.post('/api/user/avatar', upload.single('avatar'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // FĂRĂ SPAȚIU între ? și .
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;
    let email = null;
    if (token) {
        try {
            const decoded = jwt.verify(token, "secretul-meu");
            email = decoded.email;
        } catch (e) {}
    }

    const avatarUrl = `/avatars/${req.file.filename}`;
    if (email) {
        const user = users.find(u => u.email === email);
        if (user) user.avatar = avatarUrl;
    }

    res.json({ avatarUrl });
});



// Servește imaginile statice
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));
app.get('/api/jokes/:category', (req, res) => {
    const { category } = req.params;
    const filePath = `./data/jokes-${category}.json`;
    console.log("Se caută fișierul:", filePath); // ← adaugă asta

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Categoria nu există' });
    }

    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
});


// Salvează inimioare pentru glumă
app.post('/api/jokes/:category/:id/rate', (req, res) => {
    const { category, id } = req.params;
    const { hearts } = req.body;
    const filePath = `./data/jokes-${category}.json`;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Categoria nu există' });
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const joke = data.find(j => j.id === parseInt(id));

    if (joke) {
        joke.hearts = hearts;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.json({ success: true });
        if (!/^[a-zA-Z0-9_-]+$/.test(category)) {
            return res.status(400).json({ error: 'Nume de categorie invalid' });
        }

    } else {
        res.status(404).json({ error: 'Gluma nu a fost găsită' });
    }
});

app.post('/api/scores', (req, res) => {
    const { userId, hearts } = req.body;
    const today = new Date().toISOString().split('T')[0];
    // Încarcă scorurile existente, adaugă sau actualizează
    // Scrie înapoi în scores.json
});

app.get('/api/scores/:userId', (req, res) => {
    const { userId } = req.params;
    const { range } = req.query; // "daily", "weekly", "monthly", "total"
    // Returnează scorurile filtrate pe baza lui `range`
});

app.get("/profile", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Neautentificat" });

    try {
        const data = jwt.verify(token, "secretul-meu");
        res.json({ mesaj: `Salut, ${data.email}!` });
    } catch (err) {
        res.status(401).json({ message: "Token invalid" });
    }
});


app.listen(PORT, () => {
    console.log(`Server pornit la http://localhost:${PORT}`);
});