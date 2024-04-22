import { DoneCallback } from 'passport';
import { Profile } from 'passport-github2';

export interface GithubProfile extends Profile {
  _json: {
    email: string;
    name: string;
    id: number;
  };
}
