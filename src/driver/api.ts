import express from "express";
import { AccountDAODatabase } from "../resources/AccountDAO";
import { Signup } from "../application/Signup";
import { GetAccount } from "../application/GetAccount";
import { MailerGatewayMemory } from "../resources/MailerGateway";

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  try {
    const accountDAO = new AccountDAODatabase()
    const mailerGateway = new MailerGatewayMemory()
    const signup = new Signup(accountDAO, mailerGateway)
    const output = await signup.execute(req.body)
    return res.json(output)
  } catch (error: any) {
    return res.status(422).json({ error: error.message })
  }
});

app.get('/accounts/:accountId', async function (req, res) {
  const accountDAO = new AccountDAODatabase()
  const getAccount = new GetAccount(accountDAO)
  const input = {
    accountId: req.params.accountId
  }
  const output = await getAccount.execute(input)
  return res.json(output)
})

app.listen(3000);
