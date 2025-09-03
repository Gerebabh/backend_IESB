const calcularMediaAluno = require('../src/calcularMediaAluno');

describe("\n --------------------------------------------- \n Testa as funcoes da calcularMediaAluno.js \n --------------------------------------------- \n", function() {

    test("MEDIA 0 + 0 + 0 / 0 = ?", function() {
        expect(calcularMediaAluno.media(0, 0, 0)).toBe(0);
    });

        test("MEDIA 7 + 9 + 9.5 / 3 = ?", function() {
        expect(calcularMediaAluno.media(7, 9, 9.5)).toBe(8.5);
    });

    test("5A - Teste extra A nota lancada indefinidas.", function() {
        expect(() => calcularMediaAluno.media_Adicional_5A(null, 3, 3)).toThrow("Nenhuma das notas pode estar vazia.");
        expect(() => calcularMediaAluno.media_Adicional_5A(3, null, 3)).toThrow("Nenhuma das notas pode estar vazia.");
        expect(() => calcularMediaAluno.media_Adicional_5A(3, 3, null)).toThrow("Nenhuma das notas pode estar vazia.");
    });

    test("5B - Deve lançar erro quando algum parâmetro estiver Undefined", function() {
        expect(() => calcularMediaAluno.media_Adicional_5B(undefined, 3, 3)).toThrow("Todos os parâmetros devem ser definidos");
        expect(() => calcularMediaAluno.media_Adicional_5B(3, undefined, 3)).toThrow("Todos os parâmetros devem ser definidos");
        expect(() => calcularMediaAluno.media_Adicional_5B(3, 3, undefined)).toThrow("Todos os parâmetros devem ser definidos");
    });

    test("5C - Testar nota com valor negativo", function() {
        expect(() => calcularMediaAluno.media_Adicional_5C(-1, 3, 3)).toThrow("Nao pode ter nota com valor negativo");
        expect(() => calcularMediaAluno.media_Adicional_5C(3, -1, 3)).toThrow("Nao pode ter nota com valor negativo");
        expect(() => calcularMediaAluno.media_Adicional_5C(3, 3, -1)).toThrow("Nao pode ter nota com valor negativo");
    });

    test("5D - Nota A1 ou A2 nao podem ser negativas", function() {
        expect(() => calcularMediaAluno.media_Adicional_5D(-1, 3, 3)).toThrow("Notas a1 ou a2 não podem ser negativas");
        expect(() => calcularMediaAluno.media_Adicional_5D(3, -1, 3)).toThrow("Notas a1 ou a2 não podem ser negativas");
    });

    test("5E - Nota A3 não informada, calcula média com A1 e A2", function() {
        const resultado = calcularMediaAluno.media_Adicional_5E(7, 9);
        expect(resultado).toBeCloseTo(8);
    });

    test("5F - Nota A3 não informada, calcula média com pesos A1=40% e A2=60%", function() {
        const resultado = calcularMediaAluno.media_Adicional_5F(7, 9);
        expect(resultado).toBeCloseTo(8.2);
    });

    test("5G - Nota A3 negativa", function() {
        expect(() => calcularMediaAluno.media_Adicional_5G_H(3, 3, -1)).toThrow("Nota a3 não podem ser negativa");
    });

    test("5I - Quando A1 e A3 são a melhor combinação", function() {
        const resultado = calcularMediaAluno.media_Adicional_5I(7, 6, 8);
        expect(resultado).toBeCloseTo(7.5);
    });

    test("5J - Quando A2 e A3 são a melhor combinação", function() {
        const resultado = calcularMediaAluno.media_Adicional_5J(5, 7, 9);
        expect(resultado).toBeCloseTo(8);
    });

    
    test("5K - Retorna a maior nota entre A1, A2 e A3", function() {
        const resultado = calcularMediaAluno.media_Adicional_5K(7, 8.5, 6);
        expect(resultado).toBeCloseTo(8.5);
    });

});