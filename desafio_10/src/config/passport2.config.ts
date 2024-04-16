import passport, { DoneCallback } from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '@models/user.model';
import { configGithub, configJWT } from './config';
import { UserToRegister } from '@interfaces/users.interface';
import { GithubProfile } from '@interfaces/passport.interface';

const CLIENT_ID = configGithub.client_id;
const CLIENT_SECRET = configGithub.client_secret;

if (!CLIENT_ID || !CLIENT_SECRET)
  throw new Error(
    'Las variables de enterno GITHUB_CLIENT_ID y GITHUB_CLIENT_SECRET deben estar definidas.',
  );

//? Github strategy
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
      try {
        const userFound = await User.findOne({ githubId: profile._json.id });

        if (!userFound) {
          let newUser = {
            first_name: profile.username || '',
            last_name: '',
            age: 18,
            email: profile._json?.email || '',
            password: '',
            loggedBy: 'GitHub',
            githubId: profile._json.id,
          };
          const userSaved = await User.create(newUser);
          return done(null, userSaved);
        } else {
          return done(null, userFound);
        }
      } catch (error: any) {
        console.error(
          'Error al autenticar al usuario con github: ',
          error?.message || error,
        );
        done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done: any) => {
      try {
        const userFound = await User.findOne({ email });
        if (!userFound)
          return done(null, false, { message: 'Credenciales incorrectas.' });

        const passwordsMatch = await userFound.matchPassword(password);
        if (!passwordsMatch)
          return done(null, false, { message: 'Credenciales incorrectas.' });

        return done(null, userFound);
      } catch (error: any) {
        console.error(
          'Error al autenticar al usuario con github: ',
          error?.message || error,
        );
        done(error);
      }
    },
  ),
);

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: req => req.cookies.jwt,
      secretOrKey: configJWT.jwt_secret,
    },
    async (jwtPayload, done: any) => {},
  ),
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const userFound = await User.findById(id);
    if (userFound) {
      const user = {
        id: userFound._id,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        email: userFound.email,
        age: userFound.age,
      };
      return done(null, user);
    }
    return done(new Error('Usuario no encontrado.'));
  } catch (error: any) {
    done(error);
  }
});
