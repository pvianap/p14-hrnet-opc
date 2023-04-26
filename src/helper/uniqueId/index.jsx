export default function uniqueId(data) {
  return Math.max(...data.map((res) => res.id || 0)) + 1;
}
