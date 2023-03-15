import { useEthers } from "@usedapp/core";
import { getShortenedAddress } from "utils/functions";

const Header = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers();
  return (
    <header>
      <div className="content-wrapper">
        <h2>RealFevr - Senior Frontend Challenge</h2>
        {account ? (
          <button
            onClick={() => deactivate()}
            className="transition button-wrapper"
          >
            {getShortenedAddress(account)}
          </button>
        ) : (
          <button
            onClick={() => activateBrowserWallet()}
            className="button-wrapper"
          >
            Connect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
