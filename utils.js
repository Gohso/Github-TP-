// utils.js

const sum = (a, b) => {
    return a + b;
  };
  
  const multiply = (a, b) => {
    console.log('Multiplying numbers');
    return a * b; // Erreur de console.log (dans une règle ESLint par défaut)
  }
  
  function divide(a, b) {
    return a / b;
  }
  
  const result = sum(2, 3);
  multiply(2, 3);
  