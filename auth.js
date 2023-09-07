const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('./config/db'); // Varsayılan olarak userModel.js'den User nesnesini içe aktarır.
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// JWT Token Oluşturma
const generateToken = (user) => {
  const token = jwt.sign({ userId: user.User_Id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token süresi (örneğin 1 saat)
  });
  return token;
};

// JWT Token Doğrulama
const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null; // Token geçersizse veya süresi dolmuşsa null döner
  }
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Token doğrulandıysa, kullanıcıyı req objesine ekleyerek diğer middleware'larda kullanabilirsiniz
  req.userId = decodedToken.userId;
  next();
};

// Kullanıcı giriş doğrulama
app.post('/login', async (req, res) => {
  const { UserName, Passwords } = req.body;

  try {
    const user = await User.findOne({
      where: {
        UserName
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(Passwords, user.Passwords);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Şifre doğrulandıysa JWT oluşturun
    const token = generateToken(user);

    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = authMiddleware;
