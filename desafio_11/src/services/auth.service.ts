import { DoneCallback } from 'passport';

// Configs
import { configGithub, configJWT } from '@configs/config';

// Dtos
import UserDto from '@dtos/users.dto';

// Interfaces
import { GithubProfile } from '@interfaces/passport.interface';
import { IUserGithub } from '@interfaces/users.interface';

// Models
import UserModel from '@models/user.model';

// Services
import * as UserService from '@services/users.service';

// Strategies
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ConfigurationError } from '@utils/errors.util';

const CLIENT_ID = configGithub.client_id;
const CLIENT_SECRET = configGithub.client_secret;
const userDto = new UserDto();

if (!CLIENT_ID || !CLIENT_SECRET)
  throw new ConfigurationError(
    'Las variables de enterno GITHUB_CLIENT_ID y GITHUB_CLIENT_SECRET deben estar definidas.',
  );

export const githubStrategy = new GithubStrategy(
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
      let userFound = await UserService.findUserByGithubId(
        profile._json.id.toString(),
      );
      let user;

      if (!userFound) {
        let newUser: IUserGithub = {
          username: profile.username || '',
          email: profile._json?.email || '',
          githubId: profile._json.id,
        };

        userFound = await UserModel.create(
          userDto.fromGithubToDatabase(newUser),
        );
        req.res.cookie(
          'success_msg',
          '¡Te has registrado con tu cuenta de GitHub!',
        );
      } else {
        req.res.cookie('success_msg', '¡Has iniciado sesión desde GitHub!');
      }

      user = userDto.fromDatabaseToJwt(userFound);
      return done(null, user);
    } catch (error: any) {
      console.error(
        'Error al autenticar al usuario con github: ',
        error?.message || error,
      );
      done(error);
    }
  },
);

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req: any, user_email: string, password: string, done: any) => {
    try {
      const userFound = await UserService.findUserByEmail(user_email);
      if (!userFound) {
        req.res.cookie('error_msg', 'Las credenciales son inválidas.');
        return done(null, false);
      }

      const passwordsMatch = await UserService.checkPassword(
        password,
        userFound.password,
      );

      if (!passwordsMatch) {
        req.res.cookie('error_msg', 'Las credenciales son inválidas.');
        return done(null, false);
      }

      const user = userDto.fromDatabaseToJwt(userFound);

      return done(null, user);
    } catch (error: any) {
      console.error(
        'Error al autenticar al usuario con github: ',
        error?.message || error,
      );
      done(error);
    }
  },
);

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: configJWT.jwt_secret,
    passReqToCallback: true,
  },
  async (req, jwtPayload, done: any) => {
    try {
      // Buscar al usuario en la base de datos usando el id del payload del JWT
      const userFound = await UserService.findUserByEmail(
        jwtPayload.user.email,
      );

      // Si no existe en la BD
      if (!userFound) {
        req.res.cookie('error_msg', '¡Ocurrió un error inesperado!');
        return done(null, false);
      }

      const user = userDto.fromDatabaseToJwt(userFound);

      // Si existe en la BD
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
);
