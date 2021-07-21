export default function alphaSignature(val: number) {
  // Truncating the number down to 26, to eliminate
  const v = (val % 26) + 10;
  // const times = (Math.floor(val / 26) + 10) - 1;
  // console.log('times', times.toString(36), v.toString(36));

  // Polynomal equasion
  // Number((36*10*36)+(36*11)+10).toString(36)
  // Number(((36*15+30)*36+12)*36+20).toString(36)
  return v.toString(36).toLocaleUpperCase();
}
