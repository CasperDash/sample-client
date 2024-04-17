// Timeout (in ms) for requests to the extension [DEFAULT: 30 min]
const REQUESTS_TIMEOUT_MS = 30 * 60 * 1000;

export const getProvider = () => {
  let providerConstructor = window.CasperWalletProvider;
  if (providerConstructor === undefined) {
    alert("Casper Wallet extension is not installed!");
    return;
  }
  return providerConstructor({
    timeout: REQUESTS_TIMEOUT_MS,
  });
};