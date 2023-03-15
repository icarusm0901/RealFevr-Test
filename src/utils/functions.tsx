// Return shortened address for EVM, Solana wallet address

export const getShortenedAddress = (address: string) => {
  const is0x = (addr: string) => addr?.startsWith("0x");
  return `${address?.substring(0, is0x(address) ? 6 : 3)}...${address?.substr(
    address.length - (is0x(address) ? 4 : 3)
  )}`;
};
