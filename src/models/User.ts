import { Model } from "./Model";
import { Events } from "./Events";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const BACK_END_URL = "http://localhost:4444/users";

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Sync(BACK_END_URL),
      new Events()
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(BACK_END_URL, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge(): void {
    const randomAge = Math.round(Math.random() * 100);
    this.set({ age: randomAge });
  }
}
