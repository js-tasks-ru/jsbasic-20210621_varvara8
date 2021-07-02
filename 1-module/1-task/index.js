function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    
    let i = n;
    let m = n;

    
    while (i !== 1){
      i -= 1;
      
      m = m*i; 
      
    }
      
    return m;
  }
}
