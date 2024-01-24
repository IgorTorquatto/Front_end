
export const cpf_mask_remove = (cpf) => {
    if (!cpf) {return cpf}
    if (typeof cpf != 'string') {return cpf}

    return cpf.replaceAll('.', '').replace('-', '')
}

export const telefone_mask_remove = (telefone) => {
    if (!telefone) {return telefone}
    if (typeof telefone != 'string') {return telefone}

    return telefone.replace('-', '').replace('(', '').replace(')', '').replaceAll(' ', '')
}

export const cep_mask_remove = (cep) => {
    if (!cep) {return cep}
    if (typeof cep != 'string') {return cep}

    return cep.replace('-', '')
}

export const cnpj_mask_remove = (cnpj) => {
    if (!cnpj) {return cnpj}
    if (typeof cnpj != 'string') {return cnpj}

    return cnpj.replaceAll('.', '').replace('/', '').replace('-', '')
}

export const cpf_mask = (cpf) => {
    if (!cpf){ return cpf }
    if (typeof cpf != 'string') { return cpf }

    let mask_cpf = ''
    if (cpf.length == 11)
    {
        mask_cpf += cpf.slice(0, 3)
        mask_cpf += '.'
        mask_cpf += cpf.slice(3, 6)
        mask_cpf += '.'
        mask_cpf += cpf.slice(6, 9)
        mask_cpf += '-'
        mask_cpf += cpf.slice(9, 11)
    }
    else 
    {
        mask_cpf = cpf
    }
    return mask_cpf
}

export const cnpj_mask = (cnpj) => {
    if (!cnpj){ return cnpj }
    if (typeof cnpj != 'string') { return cnpj }

    let mask_cnpj = ''
    if (cnpj.length == 14)
    {
        mask_cnpj += cnpj.slice(0, 2)
        mask_cnpj += '.'
        mask_cnpj += cnpj.slice(2, 5)
        mask_cnpj += '.'
        mask_cnpj += cnpj.slice(5, 8)
        mask_cnpj += '/'
        mask_cnpj += cnpj.slice(8, 12)
        mask_cnpj += '-'
        mask_cnpj += cnpj.slice(12, 14)
    }
    else 
    {
        mask_cnpj = cnpj
    }
    return mask_cnpj
}

export const telefone_mask = (telefone) => {
    if (!telefone) { return telefone }
    if (typeof telefone != 'string') { return telefone }

    let mask_tel = ''
    if (telefone.length == 11)
    {
        mask_tel += '('
        mask_tel += telefone.slice(0, 2)
        mask_tel += ') '
        mask_tel += telefone.slice(2, 3)
        mask_tel += ' '
        mask_tel += telefone.slice(3, 7)
        mask_tel += '-'
        mask_tel += telefone.slice(7, 11)
    }
    else
    {
        mask_tel = telefone
    }

    return mask_tel
}

export const cep_mask = (cep) => {
    if (!cep) { return cep }
    if (typeof cep != 'string') { return cep }

    let mask_cep = ''
    if (cep.length == 8)
    {
        mask_cep += cep.slice(0, 5)
        mask_cep += '-'
        mask_cep += cep.slice(5, 8)
    }
    else
    {
        mask_cep = cep
    }

    return mask_cep
}

export const data_mask = (data) => {
    if (!data) { return data }
    if (typeof data != 'string') { return data }

    let mask_data = ''
    if (data.length == 10)
    {
        mask_data += data.slice(8, 10)
        mask_data += '/'
        mask_data += data.slice(5, 7)
        mask_data += '/'
        mask_data += data.slice(0, 4)
    }
    else
    {
        mask_data = data
    }

    return mask_data
}