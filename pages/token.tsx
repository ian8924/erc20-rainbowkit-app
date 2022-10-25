import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import useEnsData from "../hooks/useEns"; // 引用useEns
import { Box, Button, Container, useToast } from "@chakra-ui/react";
import useTokenMint from "../hooks/useTokenMint";
import { useState } from "react";
import useTokenBalance from '../hooks/useTokenBalance'
import useTokenApprove from '../hooks/useTokenApprove'
import useTokenAllowence from "../hooks/useTokenAllowence";

const Token: NextPage = () => {

  const [status, setStatus] = useState("idle");
  const [link, setLink] = useState("");

  const toast = useToast();
  const { freeMint } = useTokenMint(1);
  const { approve } = useTokenApprove(1);

  const { balance } = useTokenBalance();
  const { allowance } = useTokenAllowence();
  const a= 'color:red;'

  return (
    <Container>
      <Box p={5}>
        <ConnectButton />
      </Box>
      <h2>current balance : { balance }</h2>
      <h2>current allowance(by Chatroom contract) : { allowance }</h2>

      <h2>free mint</h2>
      {link && <a href={link} target="_blank" rel="noreferrer">view on Etherscan {link} </a>}
      <Button
        onClick={async () => {
          setStatus("pending");
          let freeMintTx = await freeMint();
          setStatus("waiting for Tx complete");
          setLink(`https://goerli.etherscan.io/tx/${freeMintTx.hash}`)
          await freeMintTx.wait();
          setStatus("Tx complete");
          toast({
            title: "Mint Complete !",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        Mint!
      </Button>
      <h2> status {status}</h2>
      <Button
        onClick={async () => {
          setStatus("pending");
          let freeMintTx = await approve();
          setStatus("waiting for Tx complete");
          setLink(`https://goerli.etherscan.io/tx/${freeMintTx.hash}`)
          await freeMintTx.wait();
          setStatus("Tx complete");
          toast({
            title: "Approve Complete !",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }}
      >
       Increase Allowance
      </Button>
    </Container>
  );
};

export default Token;
