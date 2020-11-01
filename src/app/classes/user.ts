export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public img?: string,
    public created?: Date,
    public _id?: string
  ) {}
}
