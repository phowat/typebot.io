const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/

export const validateCPF = (cpf: string) => cpfRegex.test(cpf)
export const validateCNPJ = (cnpj: string) => cnpjRegex.test(cnpj)
