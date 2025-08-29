const calculadora = require('../src/calculadora')

describe("\n ----------------------------------- \n Testa as funcoes da calculadora.js \n ----------------------------------- \n", function() {

    test("SOMA 2 + 2 = 4?", function() {
        expect(calculadora.soma(2, 2)).toBe(4);
    });

    test("SUBTRACAO 2 - 8 = -6?", function() {
        expect(calculadora.subtracao(2, 8)).toBe(-6);
    });

    test("SOMA -2 + 4 = 2?", function() {
        expect(calculadora.soma(-2, 4)).toBe(2);
    });

    test("MULTIPLICACAO 2 * 5 = 10?", function() {
        expect(calculadora.multiplicacao(2, 5)).toBe(10);
    });

    test("DIVISAO 10 / 5 = 2?", function() {
        expect(calculadora.divisao(10, 5)).toBe(2);
    });

    test('Divisão por zero deve lançar erro', () => {
        expect(() => calculadora.divisao(10, 0)).toThrow('Divisão por zero não é permitida');
    });

    test("Multiplicar inteiro com inteiro da inteiro", function() {
        expect(calculadora.multiplicacao).toBeDefined();
        expect(calculadora.multiplicacao(2, 2)).toBe(4);
        expect(calculadora.multiplicacao(2, 0)).toBe(0);
        expect(calculadora.multiplicacao(2, -1)).toBe(-2);
        expect(calculadora.multiplicacao(-2, -1)).toBe(2);
    })

})

