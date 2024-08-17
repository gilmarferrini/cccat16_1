import crypto from 'crypto'
import { AccountDAODatabase } from '../src/resources/AccountDAO';

test("deve salvar um registro na tabela account e consultar por id", async () => {
  const id = crypto.randomUUID();
  const account = {
    accountId: id,
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '87748248800',
    isPassenger: true
  }
  const accountDAO = new AccountDAODatabase()
  await accountDAO.saveAccount(account)
  const savedAccount = await accountDAO.getAccountById(account.accountId)
  expect(savedAccount.account_id).toBe(account.accountId)
  expect(savedAccount.name).toBe(account.name)
  expect(savedAccount.email).toBe(account.email)
  expect(savedAccount.cpf).toBe(account.cpf)
})

test("deve salvar um registro na tabela account e consultar por email", async () => {
  const id = crypto.randomUUID();
  const account = {
    accountId: id,
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '87748248800',
    isPassenger: true
  }
  const accountDAO = new AccountDAODatabase()
  await accountDAO.saveAccount(account)
  const savedAccount = await accountDAO.getAccountByEmail(account.email)
  expect(savedAccount.account_id).toBe(account.accountId)
  expect(savedAccount.name).toBe(account.name)
  expect(savedAccount.email).toBe(account.email)
  expect(savedAccount.cpf).toBe(account.cpf)
})
