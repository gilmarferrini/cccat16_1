import express from "express";
import pgp from "pg-promise";
const app = express();
app.use(express.json());

// Driven/Resource Port
export interface AccountDAO {
  getAccountByEmail(email: string): Promise<any>;
  getAccountById(accountId: string): Promise<any>;
  saveAccount(account: any): Promise<void>;
}

// Drive/Resource Adapter
export class AccountDAODatabase implements AccountDAO {
  async getAccountByEmail(email: string){
    const connection = pgp()("postgres://postgres:test@localhost:5432/app");
    const [account] = await connection.query("select * from cccat16.account where email = $1", [email]);
    await connection.$pool.end();
    return account;
  }

  async getAccountById(accountId: string) {
    const connection = pgp()("postgres://postgres:test@localhost:5432/app");
    const [account] = await connection.query("select * from cccat16.account where account_id = $1", [accountId]);
    await connection.$pool.end();
    return account;
  }

  async saveAccount(account: any) {
    const connection = pgp()("postgres://postgres:test@localhost:5432/app");
    await connection.query(
      "insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        account.accountId,
        account.name,
        account.email,
        account.cpf,
        account.carPlate,
        !!account.isPassenger,
        !!account.isDriver,
      ],
    );
    await connection.$pool.end();
  }
}

// Drive/Resource Adapter
export class AccountDAOMemory implements AccountDAO {
  accounts: any[];

  constructor () {
    this.accounts = []
  }

  async getAccountByEmail(email: string) {
    return this.accounts.find((account) => account.email === email);
  }

  async getAccountById(accountId: string) {
    return this.accounts.find((account) => account.accountId === accountId);
  }

  async saveAccount(account: any) {
    this.accounts.push(account);
  }
}
