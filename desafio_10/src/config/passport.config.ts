import passport, { DoneCallback } from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import User from '@models/user.model';
import { configGithub, configJWT } from './config';
import { GithubProfile } from '@interfaces/passport.interface';
import { UserJwt } from '@interfaces/users.interface';

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
      passReqToCallback: true,
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: GithubProfile,
      done: DoneCallback,
    ) => {
      try {
        const userFound = await User.findOne({ githubId: profile._json.id });

        let user: UserJwt = {
          first_name: profile.username || '',
          last_name: '',
          email: profile._json?.email || '',
          age: 18,
          role: 'user',
          githubId: profile._json.id,
        };

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

          const createdUser = await User.create(newUser);

          user.id = createdUser._id;

          req.res.cookie(
            'success_msg',
            '¡Te has registrado con tu cuenta de GitHub!',
          );

          return done(null, user);
        } else {
          user.id = userFound._id;

          req.res.cookie('success_msg', '¡Has iniciado sesión desde GitHub!');

          return done(null, user);
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
      passReqToCallback: true,
    },
    async (req: any, user_email: string, password: string, done: any) => {
      try {
        const userFound = await User.findOne({ email: user_email });
        if (!userFound) {
          console.log(`No se encontro el usuario con este mail ${user_email}`);
          req.res.cookie('error_msg', 'Las credenciales son inválidas.');
          return done(null, false);
        }

        const passwordsMatch = await userFound.matchPassword(password);
        if (!passwordsMatch) {
          console.log('Las contraseñas no coinciden');
          req.res.cookie('error_msg', 'Las credenciales son inválidas.');
          return done(null, false);
        }

        const { _id, first_name, last_name, email, age, role } = userFound;

        const user = {
          _id,
          first_name,
          last_name,
          email,
          age,
          role,
        };

        return done(null, user);
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
    async (jwtPayload, done: any) => {
      try {
        // Buscar al usuario en la base de datos usando el id del payload del JWT
        const userFound = await User.findById(jwtPayload.id);

        // Si no existe en la BD
        if (!userFound) return done(null, false);

        const { _id, first_name, last_name, email, age, role } = userFound;

        const user = {
          _id,
          first_name,
          last_name,
          email,
          age,
          role,
        };

        // Si existe en la BD
        return done(null, user);
      } catch (error) {
        // En caso de error, continuar con el error
        return done(error, false);
      }
    },
  ),
);
