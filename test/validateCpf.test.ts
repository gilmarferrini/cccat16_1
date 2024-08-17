import { validate } from "../src/application/validateCpf";

const validsCpfs = ["97456321558", "71428793860", "87748248800"];
test.each(validsCpfs)("Deve testar um cpf válido: %s", (cpf: string) => {
  expect(validate(cpf)).toBe(true);
});

test.each([undefined, null, "11111111111", "123", "1234566789123456789"])(
  "Deve testar um cpf inválido: %s",
  function (cpf: any) {
    expect(validate(cpf)).toBe(false);
  },
);
