import { useProvider, useEnsName, useAccount, useBalance } from "wagmi";
import { useEffect, useState } from "react";
interface IensData { //定義數據架構
  address?: string,
  ensName?: string,
  email?: string,
  twitter?: string,
  github?: string,
  avatarUrl?: string,
  websiteUrl?: string
}
const useEns = (_addr?: string) => {
  const { address } = useAccount();
  const [_address, setFinalAddr] = useState("");
  const provider = useProvider();
  const [ensData, setEnsData] = useState<IensData>({}); //使用並定義
  const { data, isError, isLoading } = useEnsName({
    address: _address,
  });// 讀取EnsName
  useEffect(() => {
    setFinalAddr(_addr || address || "");
  }, [_addr, address]);
    // 設定EnsData  資料
  async function getAndSetEnsData(_ensName: string) {
    console.log("getAndSetEnsData", _ensName);
    // 取得錢包設定 Ens 資料
    const resolver = await provider.getResolver(_ensName);
    if (!resolver) {
      console.log("ens name not found");
      return;
    }
    const email = await resolver.getText("email");
    const twitter = await resolver.getText("com.twitter");
    const github = await resolver.getText("com.github");
    const avatarUrl = await resolver.getText("avatar");
    const websiteUrl = await resolver.getText("url");

    setEnsData({
      ensName: _ensName,
      email,
      twitter,
      github,
      avatarUrl,
      websiteUrl,
      address,
    });
  }

  useEffect(() => {
    if (data) {
      getAndSetEnsData(data || "");
    }
  }, [_address]);

  return { ensData };
};

export default useEns;