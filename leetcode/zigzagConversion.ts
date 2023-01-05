function getZigzagRows(s: string, numRows: number): string[][] {
  const _result: string[][] = Array.from({ length: numRows }, () => []);

  let _currRow = 0;
  let _isReverse = false;

  for (let i = 0; i < s.length; i += 1) {
    const _char = s[i];

    _result[_currRow].push(_char);

    if (_isReverse === false) {
      _currRow += 1;
    } else {
      _currRow -= 1;
    }

    if (_currRow === numRows - 1 || _currRow === 0) {
      _isReverse = !_isReverse;
    }
  }

  return _result;
}

function convert(s: string, numRows: number): string {
  if (numRows === 1 || s.length < numRows) {
    return s;
  }

  let result = "";

  getZigzagRows(s, numRows).forEach((row) => {
    result += row.join("");
  });

  return result;
}

console.log(convert("PAYPALISHIRING", 3));
console.log(convert("PAYPALISHIRING", 4));
