import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Calendar from "react-calendar";

import { useGlobalContext } from "contexts/GlobalContext";
import { useEthers } from "@usedapp/core";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { SignatureLike } from "@ethersproject/bytes";

function AddEmoji() {
  const { hash } = useParams();
  const navigate = useNavigate();
  const { account } = useEthers();
  const { addEmoji } = useGlobalContext();
  const [value, onChange] = useState(new Date());
  const emoji = decodeURIComponent(window.atob(hash || ""));

  const onClickAdd = async () => {
    if (!window?.ethereum) {
      toast.error("Install Metamask!");
      return;
    }

    if (!account) {
      toast.error("Wallet is not connected.");
      return;
    }

    try {
      const from = account;
      const msg = `Please sign me.\n${emoji}`;
      const sign = await window.ethereum.request({
        method: "personal_sign",
        params: [msg, from, "Example password"],
      });

      const signerAddress = ethers.utils.verifyMessage(
        msg,
        sign as SignatureLike
      );
      if (signerAddress !== account) {
        toast.error("Invalid signature!");
        return;
      }

      addEmoji({
        title: emoji,
        start: value,
      });

      navigate("/");
    } catch (e: any) {
      toast.error(e?.message);
      console.log(e);
    }
  };

  return (
    <div className="add-content">
      <div className="emoji">
        Add <span>{emoji}</span>
      </div>
      <div className="datepicker">
        <Calendar onChange={onChange} value={value} />
      </div>
      <button onClick={onClickAdd} className="button-wrapper">
        Add
      </button>
    </div>
  );
}

export default AddEmoji;
