import { createHash, isValidPassword } from '../utils/passwordEncryption.utils';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '@models/user.model';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    // Busco el usuario en la BD por el param username (email)
    const dbUser = await User.findOne({ email: username });

    console.log(dbUser);

    // Validación de si existe el usuario y si la contraseña coincide
    if (!dbUser || !isValidPassword(password, dbUser.password)) {
      // Si NO existe o NO coincide la pass -> return done(null, false)
      return done(null, false);
    }
    // Guardo la información que necesito del usuario
    const userInfo = {
      id: dbUser._id,
      name: `${dbUser.first_name} ${dbUser.last_name}`,
      email: dbUser.email,
      age: dbUser.age,
    };
    // Si existe y la contraseña es correcta -> done(null, {*datos del usuario*})
    done(null);
  }),
);

// Del usuario solamente guardo el id como referencia
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Mediante el id que almacene en la serialización,
// traigo el user para poder utilizarlo en cualquier parte
passport.deserializeUser(async (id, done) => {
  // Busco el usuario en la BD por id
  const dbUser = await User.findOne({ _id: id });
  if (!dbUser) return done(null, false);

  // Retorno usuario -> done(null, user)
  done(null, dbUser);
});
