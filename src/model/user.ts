import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export class User {
  _id?: ObjectId;

  constructor(
    public username: string,
    public name: string,
    public email: string,
    public password: string
  ) {}

  async hashPassword(): Promise<void> {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  static validateEmail(email: string): boolean {
    console.log("Validating email:", email);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

  
}
