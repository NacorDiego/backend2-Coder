import passport, { DoneCallback } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy, Profile } from 'passport-github2';
import User from '@models/user.model';
import { configGithub } from './config';

const CLIENT_ID = configGithub.client_id;
const CLIENT_SECRET = configGithub.client_secret;

if (!CLIENT_ID || !CLIENT_SECRET)
  throw new Error(
    'Las variables de enterno GITHUB_CLIENT_ID y GITHUB_CLIENT_SECRET deben estar definidas.',
  );

interface GithubProfile extends Profile {
  _json: {
    email: string;
    name: string;
    id: number;
  };
}

//? Estrategia GITHUB
passport.use(
  'github',
  new GithubStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/users/github/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: GithubProfile,
      done: DoneCallback,
    ) => {
      console.log('Perfil obtenido del usuario en github:');
      console.log(profile);
      try {
        const dbUser = await User.findOne({ githubId: profile._json.id });

        if (!dbUser) {
          let newUser = {
            first_name: profile.username,
            last_name: '',
            age: 18,
            email: profile._json?.email || '',
            password: '',
            loggedBy: 'GitHub',
            githubId: profile._json.id,
          };
          const result = await User.create(newUser);
          return done(null, result);
        } else {
          return done(null, dbUser);
        }
      } catch (error: any) {
        console.error('Error al autenticar al usuario con github: ', error);
        done(error);
      }
    },
  ),
);

//? Estrategia LOCAL
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
