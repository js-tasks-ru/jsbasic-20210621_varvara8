function sumSalary(salaries) {
  let sum = 0;

  for (let key in salaries) {
   // console.log(key);
    if (typeof salaries[key] === 'number' && Number.isInteger(salaries[key])) {
      sum += salaries[key];
      
     //console.log(salaries[key]);
      
    }
  }
  
  return sum;
}

const salaries = { 
  John: 1000, 
  Ann: 1600,
  Pete: 1300,
  Bob: NaN,
  Peter: Infinity,
  Ivan: -Infinity,
  month: 'December',
  currency: 'USD',
  isPayed: false
};

sumSalary(salaries);