import crypto from "crypto";

import { AccountDAO } from "../resources/AccountDAO";
import { validate } from "./validateCpf";
import { MailerGateway } from "../resources/MailerGateway";


export class Signup {

  constructor (readonly accountDAO: AccountDAO, readonly mailerGateway: MailerGateway) {}

  async execute(input: any): Promise<any> {
    const account = input;
    account.accountId = crypto.randomUUID();
    const existingAccount = await this.accountDAO.getAccountByEmail(input.email)
    if (existingAccount) throw new Error('Account already exists')
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error('Invalid name')
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error('Invalid email')
    if (!validate(input.cpf)) throw new Error('Invalid CPF')
    if (input.isDriver && input.carPlate && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error('Invalid car plate')
    await this.accountDAO.saveAccount(account);
    await this.mailerGateway.send(account.email, 'Welcome!', 'Welcome to our platform!')
    return account
  }

}
