import passport, { DoneCallback } from 'passport';

// Services
import {
  githubStrategy,
  jwtStrategy,
  localStrategy,
} from '@services/auth.service';

passport.use('github', githubStrategy);
passport.use('login', localStrategy);
passport.use('jwt', jwtStrategy);
