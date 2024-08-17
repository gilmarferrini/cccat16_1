import axios from 'axios';

axios.defaults.validateStatus = () => {
  return true;
}

test('Deve criar uma conta para o passageiro', async () => {
  const input = {
    name: 'John Doe',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '87748248800',
    isPassenger: true
  }
  const responseSignup = await axios.post('http://localhost:3000/signup', input);
  expect(responseSignup.status).toBe(200)
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;
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
  const responseSignup = await axios.post('http://localhost:3000/signup', input);
  expect(responseSignup.status).toBe(200)
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
  expect(outputGetAccount.car_plate).toBe(input.carPlate);
})

test('Não deve criar uma conta para o passageiro sem o nome for inválido', async () => {
  const input = {
    name: 'John',
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: '87748248800',
    isPassenger: true
  }
  const responseSignup = await axios.post('http://localhost:3000/signup', input);
  expect(responseSignup.status).toBe(422)
  const outputSignup = responseSignup.data;
  expect(outputSignup).toBe(-3)
})
