export default function useConverter() {
  const convertToDollar = ((item: number) => `$${item || 0}`);

  return {
    convertToDollar,
  };
}
