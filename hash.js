const bcrypt = require('bcryptjs');
bcrypt.hash('dabasene2004', 10).then(h => console.log(h));