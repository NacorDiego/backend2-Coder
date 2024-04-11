import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '@models/user.model';

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done: any) => {
      //? Confirmar si existe el correo
      const dbUser = await User.findOne({ email });
      if (!dbUser) {
        return done(null, false, { message: 'Credenciales incorrectas.' });
      }

      //? Confirmar si la contraseña es correcta
      const match = await dbUser.matchPassword(password);
      if (!match) {
        return done(null, false, { message: 'Credenciales incorrectas.' });
      }

      return done(null, dbUser);
    },
  ),
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser(
  async (id: string, done: (err: any, user?: any) => void) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  },
);
