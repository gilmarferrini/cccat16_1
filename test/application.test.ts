import { GetAccount } from "../src/application/GetAccount"
import { Signup } from "../src/application/Signup"
import { AccountDAOMemory } from "../src/resources/AccountDAO"
import { MailerGatewayMemory } from "../src/resources/MailerGateway"


let signup: Signup
let getAccount: GetAccount

beforeEach(async () => {
  const accountDAO = new AccountDAOMemory()
  const mailerGateway = new MailerGatewayMemory()
  signup = new Signup(accountDAO, mailerGateway)
  getAccount = new GetAccount(accountDAO)
})

test('Deve criar uma conta para o passageiro', async () => {
  const input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '87748248800',
    isPassenger: true
  }
  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined();
  const outputGetAccount = await getAccount.execute(outputSignup)
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
})

test('Deve criar uma conta para o motorista', async () => {
  const input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '87748248800',
    isPassenger: false,
    isDriver: true,
    carPlate: 'AAA9999'
  }
  const outputSignup = await signup.execute(input)
  expect(outputSignup.accountId).toBeDefined();
  const outputGetAccount = await getAccount.execute(outputSignup)
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
  expect(outputGetAccount.carPlate).toBe(input.carPlate);
})

test('Não deve criar uma conta para o passageiro sem o nome for inválido', async () => {
  const input = {
    name: 'John',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '87748248800',
    isPassenger: true
  }
  expect(async () => {
    await signup.execute(input)
  }).rejects.toThrow(new Error('Invalid name'))
})
