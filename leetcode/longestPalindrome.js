const centeredPalindrome = (left, right, s) => {
  let _start = left;
  let _end = right;

  while (_start >= 0 && _end < s.length && s[_start] === s[_end]) {
    _start -= 1;
    _end += 1;
  }

  return s.slice(_start + 1, _end);
};

function longestPalindrome(s) {
  if (s.length === 1) return s;

  let length = s.length;
  let result = '';

  for (let i = 0; i < length - 1; i += 1) {
    let oddPal = centeredPalindrome(i, i + 1, s);
    let evenPal = centeredPalindrome(i, i, s);

    if (oddPal.length > result.length) result = oddPal;
    if (evenPal.length > result.length) result = evenPal;
  }

  return result 
};

console.log(longestPalindrome('a'))
console.log(longestPalindrome('abbs'))
console.log(longestPalindrome('1234dfls;f'))
