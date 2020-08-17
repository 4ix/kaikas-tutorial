import React from "react";
import { KLAY_FAUCET } from "constants/url";

import "./WalletInfo.scss";

const WalletInfo = ({ address, balance }) => {
  return (
    <div className="WalletInfo">
      <h2 className="WalletInfo__title">지갑 정보</h2>
      <div className="WalletInfo__infoBox">
        <div className="WalletInfo__info">
          <span className="WalletInfo__label">지갑 주소</span>
          {address || "카이카스로 로그인 해 주세요 :)"}
        </div>
        <div className="WalletInfo__info">
          <span className="WalletInfo__label">잔액</span>
          <span className="WalletInfo__balance">{balance}</span>
          <span className="WalletInfo__unit">KLAY</span>
        </div>
      </div>
      <p className="WalletInfo__faucet">
        If you need small amount of Klay for testing.
        <a
          className="WalletInfo__link"
          href={KLAY_FAUCET}
          target="_blank"
          rel="noreferrer noopener"
        >
          Run Klay Faucet
        </a>
      </p>
    </div>
  );
};

export default WalletInfo;
