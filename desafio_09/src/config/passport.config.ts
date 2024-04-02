import { createHash, isValidPassword } from '../utils/passwordEncryption.utils';
import passport from 'passport';
import PassportLocal from 'passport-local';

passport.use(
  new PassportLocal(function (username, password, done) {
    //TODO: Busco el usuario en la BD por el param username (email)
    //TODO: Validación de si existe el usuario y si la contraseña coincide
    //TODO: Si NO existe o NO coincide la pass -> return done(null, false)
    //TODO: Si existe y la contraseña es correcta -> done(null, {*datos del usuario*})
  }),
);

// Del usuario solamente guardo el id como referencia
passport.serializeUser(function (user, done) {
  //TODO: done(null,user.id)
});

// Mediante el id que almacene en la serialización,
// traigo el user para poder utilizarlo en cualquier parte
passport.deserializeUser(function (id, done) {
  //TODO: Busco el usuario en la BD por id
  //TODO: Retorno usuario -> done(null, user)
});
