import React, { Component } from "react";
import caver from "klaytn/caver";

import Nav from "components/Nav";
import WalletInfo from "components/WalletInfo";
import Dropdown from "components/Dropdown";
import GithubLink from "components/GithubLink";
import ValueTransferLegacy from "components/ValueTransferLegacy";
import SmartContractExecutionLegacy from "components/SmartContractExecutionLegacy";
import SmartContractDeployLegacy from "components/SmartContractDeployLegacy";
import AddToken from "components/AddToken";
import SignMessage from "components/SignMessage";
import ValueTransfer from "components/ValueTransfer";
import ValueTransferFD from "components/ValueTransferFD";
import ValueTransferFDRatio from "components/ValueTransferFDRatio";
import ValueTransferMemo from "components/ValueTransferMemo";
import ValueTransferMemoFD from "components/ValueTransferMemoFD";
import ValueTransferMemoFDRatio from "components/ValueTransferMemoFDRatio";
import AccountUpdate from "components/AccountUpdate";
import AccountUpdateFD from "components/AccountUpdateFD";
import AccountUpdateFDRatio from "components/AccountUpdateFDRatio";
import SmartContractDeploy from "components/SmartContractDeploy";
import SmartContractDeployFD from "components/SmartContractDeployFD";
import SmartContractDeployFDRatio from "components/SmartContractDeployFDRatio";
import SmartContractExecution from "components/SmartContractExecution";
import SmartContractExecutionFD from "components/SmartContractExecutionFD";
import SmartContractExecutionFDRatio from "components/SmartContractExecutionFDRatio";

import "./KaikasPage.scss";

const txTypeList = {
  "클레이 전송 (Legacy)": "ValueTransferLegacy",
  "스마트 컨트랙트 Deploy (Legacy)": "SmartContractDeployLegacy",
  "토큰 전송 (Legacy)": "SmartContractExecutionLegacy",
  "토큰 추가": "AddToken",
  "메세지 서명": "SignMessage",
  "클레이 전송": "ValueTransfer",
  "클레이 전송 (수수료 위임)": "ValueTransferFD",
  "클레이 전송 (비율에 따른 수수료 위임)": "ValueTransferFDRatio",
  "클레이 전송 with Memo": "ValueTransferMemo",
  "클레이 전송 with Memo (수수료 위임)": "ValueTransferMemoFD",
  "클레이 전송 with Memo (비율에 따른 수수료 위임)": "ValueTransferMemoFDRatio",
  "계정 업데이트": "AccountUpdate",
  "계정 업데이트 (수수료 위임)": "AccountUpdateFD",
  "계정 업데이트 (비율에 따른 수수료 위임)": "AccountUpdateFDRatio",
  "스마트 컨트랙트 Deploy": "SmartContractDeploy",
  "스마트 컨트랙트 Deploy (수수료 위임)": "SmartContractDeployFD",
  "스마트 컨트랙트 Deploy (비율에 따른 수수료 위임)":
    "SmartContractDeployFDRatio",
  "토큰 전송": "SmartContractExecution",
  "토큰 전송 (수수료 위임)": "SmartContractExecutionFD",
  "토큰 전송 (비율에 따른 수수료 위임)": "SmartContractExecutionFDRatio",
};

class KaikasPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txType: null,
      account: "",
      balance: 0,
      network: null,
    };
  }

  componentDidMount() {
    this.loadAccountInfo();
    this.setNetworkInfo();
  }

  loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        this.setAccountInfo(klaytn);
        klaytn.on("accountsChanged", () => this.setAccountInfo(klaytn));
      } catch (error) {
        console.log("User denied account access");
      }
    } else {
      console.log(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }
  };

  setAccountInfo = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    const account = klaytn.selectedAddress;
    const balance = await caver.klay.getBalance(account);
    this.setState({
      account,
      balance: caver.utils.fromPeb(balance, "KLAY"),
    });
  };

  setNetworkInfo = () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    this.setState({ network: klaytn.networkVersion });
    klaytn.on("networkChanged", () =>
      this.setNetworkInfo(klaytn.networkVersion)
    );
  };

  selectTxType = (txType) => this.setState({ txType });

  renderTxExample = (txType, from) => {
    switch (txType) {
      case "클레이 전송 (Legacy)":
        return <ValueTransferLegacy from={from} />;
      case "스마트 컨트랙트 Deploy (Legacy)":
        return <SmartContractDeployLegacy from={from} />;
      case "토큰 전송 (Legacy)":
        return <SmartContractExecutionLegacy from={from} />;
      case "토큰 추가":
        return <AddToken />;
      case "메세지 서명":
        return <SignMessage from={from} />;
      case "클레이 전송":
        return <ValueTransfer from={from} />;
      case "클레이 전송 (수수료 위임)":
        return <ValueTransferFD from={from} />;
      case "클레이 전송 (비율에 따른 수수료 위임)":
        return <ValueTransferFDRatio from={from} />;
      case "클레이 전송 with Memo":
        return <ValueTransferMemo from={from} />;
      case "클레이 전송 with Memo (수수료 위임)":
        return <ValueTransferMemoFD from={from} />;
      case "클레이 전송 with Memo (비율에 따른 수수료 위임)":
        return <ValueTransferMemoFDRatio from={from} />;
      case "스마트 컨트랙트 Deploy":
        return <SmartContractDeploy from={from} />;
      case "스마트 컨트랙트 Deploy (수수료 위임)":
        return <SmartContractDeployFD from={from} />;
      case "스마트 컨트랙트 Deploy (비율에 따른 수수료 위임)":
        return <SmartContractDeployFDRatio from={from} />;
      case "토큰 전송":
        return <SmartContractExecution from={from} />;
      case "토큰 전송 (수수료 위임)":
        return <SmartContractExecutionFD from={from} />;
      case "토큰 전송 (비율에 따른 수수료 위임)":
        return <SmartContractExecutionFDRatio from={from} />;
      case "계정 업데이트":
        return <AccountUpdate from={from} />;
      case "계정 업데이트 (수수료 위임)":
        return <AccountUpdateFD from={from} />;
      case "계정 업데이트 (비율에 따른 수수료 위임)":
        return <AccountUpdateFDRatio from={from} />;
      default:
        return (
          <p className="KaikasPage__guide">트랜잭션 예시를 선택해 주세요 :D</p>
        );
    }
  };

  render() {
    const { account, balance, txType, network } = this.state;
    const txTypeTitles = Object.keys(txTypeList);

    return (
      <div className="KaikasPage">
        <Nav network={network} />
        <a
          className="KaikasPage__githubLink"
          href="https://github.com/klaytn/kaikas-tutorial"
          title="Link to Kaikas tutorial github repository"
        >
          <img src="images/icon-github.svg" alt="Kaikas Tutorial Github" />
        </a>
        <div className="KaikasPage__main">
          <WalletInfo address={account} balance={balance} />
          <div className="KaikasPage__content">
            <Dropdown
              className="KaikasPage__dropdown"
              placeholder="트랜잭션 유형"
              selectedItem={txType}
              handleSelect={this.selectTxType}
              list={txTypeTitles}
            />
            <div className="KaikasPage__txExample">
              <header className="KaikasPage__txExampleHeader">
                <h2 className="KaikasPage__txExampleTitle">{txType}</h2>
                {txType && <GithubLink component={txTypeList[txType]} />}
              </header>
              {this.renderTxExample(txType, account)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KaikasPage;
