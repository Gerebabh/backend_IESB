function media(a, b, c) {
    return (a + b + c) / 3;
}

function media_Adicional_5A(a, b, c) {
    if (a === null || b === null || c === null) {
        throw new Error("Nenhuma das notas pode estar vazia.");
    }
    return (a + b + c) / 3;
}


function media_Adicional_5B(a, b, c) {
    if (a === undefined || b === undefined || c === undefined) {
        throw new Error("Todos os parâmetros devem ser definidos");
    }
    return (a + b + c) / 3;
}

function media_Adicional_5C(a, b, c) {
    if (a < 0 || b < 0 || c < 0) {
        throw new Error("Nao pode ter nota com valor negativo");
    }
    return (a + b + c) / 3;
}

function media_Adicional_5D(a, b, c) {
    if (a < 0 || b < 0 || c < 0) {
        throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
    return (a + b + c) / 3;
}

function media_Adicional_5E(a, b, c) {
    if (a < 0 || b < 0) {
        throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
    if (c === undefined) {
        return (a + b) / 2;
    }
    return (a + b + c) / 3;
}

function media_Adicional_5F(a, b, c) {
    if (a < 0 || b < 0) {
        throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
    if (c === undefined) {
        return ((a * 0.4) + (b * 0.6));
    }
    return (a + b + c) / 3;
}

function media_Adicional_5G_H(a, b, c) {
    if (c < 0) {
        throw new Error("Nota a3 não podem ser negativa");
    }
    return (a + b + c) / 3;
}

function media_Adicional_5I(a, b, c) {
    const somaA1A3 = a + c;
    const somaA2A3 = b + c;
    const somaA1A2 = a + b;

    if (somaA1A3 > somaA2A3 && somaA1A3 > somaA1A2) {
        return (a + c) / 2;
    }

    return (a + b + c) / 3;
}

function media_Adicional_5J(a, b, c) {
    const somaA1A3 = a + c;
    const somaA2A3 = b + c;
    const somaA1A2 = a + b;

    if (somaA1A3 > somaA2A3 && somaA1A3 > somaA1A2) {
        return (a + c) / 2;
    } else if (somaA2A3 > somaA1A3 && somaA2A3 > somaA1A2) {
        return (b + c) / 2;
    }

    return (a + b + c) / 3;
}

function media_Adicional_5K(a, b, c) {
    return Math.max(a, b, c);
}


module.exports = {
    media,
    media_Adicional_5A,
    media_Adicional_5B,
    media_Adicional_5C,
    media_Adicional_5D,
    media_Adicional_5E,
    media_Adicional_5F,
    media_Adicional_5G_H,
    media_Adicional_5I,
    media_Adicional_5J,
    media_Adicional_5K
};