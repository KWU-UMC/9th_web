export const isPrime = (num: number) => {
    if (num < 2) return false;

    for(let i = 2 ; i < num ; i++){
        if(num % i === 0) return false;
    }
    
    return true;
};

export const findPrimeNumbers = (max:number) => {
    const primeNumbers = [];

    for(let i = 2 ; i <= max ; i++){
        if(isPrime(i)) primeNumbers.push(i);
    }

    return primeNumbers;
};