// Função para calcular exponenciação modular
function modExp(base: number, exponent: number, modulus: number): number {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

// Função Diffie-Hellman para gerar a chave compartilhada
function diffieHellman(p: number, g: number, privateKeysA: number[], publicKeysA: number[], privateKeysB: number[], publicKeysB: number[]): number {
    // Calculando chaves compartilhadas entre A e B
    const sharedKeysA: number[] = [];
    const sharedKeysB: number[] = [];

    for (let i = 0; i < publicKeysB.length; i++) {
        const sharedKeyA = modExp(publicKeysB[i], privateKeysA[i], p);
        sharedKeysA.push(sharedKeyA);
    }

    for (let i = 0; i < publicKeysA.length; i++) {
        const sharedKeyB = modExp(publicKeysA[i], privateKeysB[i], p);
        sharedKeysB.push(sharedKeyB);
    }

    // Encontrando a interseção de chaves compartilhadas
    const sharedKeysIntersection = sharedKeysA.filter(key => sharedKeysB.includes(key));

    if (sharedKeysIntersection.length === 0) {
        throw new Error("Erro: Não há chaves compartilhadas entre A e B.");
    }

    // Retornando a primeira chave compartilhada encontrada
    return sharedKeysIntersection[0];
}

// Parâmetros comuns (p, g) - valores grandes são preferidos
const p = 23; // Um número primo grande
const g = 5; // Um número primitivo de p

// Chaves privadas e públicas de A
const privateKeysA = [6, 7, 8]; // Chaves privadas de A
const publicKeysA = privateKeysA.map(key => modExp(g, key, p)); // Chaves públicas de A

// Chaves privadas e públicas de B
const privateKeysB = [9, 10, 11]; // Chaves privadas de B
const publicKeysB = privateKeysB.map(key => modExp(g, key, p)); // Chaves públicas de B

// Gerando a chave secreta compartilhada
const sharedKey = diffieHellman(p, g, privateKeysA, publicKeysA, privateKeysB, publicKeysB);
console.log("Chave secreta compartilhada:", sharedKey);
