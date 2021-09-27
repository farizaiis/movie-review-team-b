const bcrypt = require('bcrypt');

// function untuk enkripsi password user pada saat signup
function encrypt(rawPass) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(rawPass, saltRounds);
    return hash;
};

// function untuk mengecek password user pada saat signin
function cekPass(rawPass, hashedPass) {
    return bcrypt.compareSync(rawPass, hashedPass);
};

module.exports = { encrypt, cekPass }