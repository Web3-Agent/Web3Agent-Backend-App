import { ethers } from "ethers";
import { ERC20abi } from "../constants/abi/ERC20-ABI";
import { WETHabi } from "../constants/abi/WETH-ABI";
import { PancakeSwapAbi } from "../constants/abi/PancakeSwap-ABI";
import { VenusAbi } from "../constants/abi/Venus-ABI";
import { LimitOrderAbi } from "../constants/abi/LimitOrder-ABI";
import { Request, Response } from "express";
import { CONTRACT_ADDRESSES } from "../constants/contractAddresses";
import { ENV_VARIABLES } from "../configurations/env";
import axios from "axios";
import qs from "qs";

export const getApproveERC20TokenCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromAddress, toAddress, amount } = request.body;

        const erc20Interface = new ethers.Interface(ERC20abi);
        const encodedCall = erc20Interface.encodeFunctionData("approve", [toAddress, amount]);
        console.log(encodedCall);
        const txnInfo = {
            action: "approve",
            from: userAddress,
            token: fromAddress,
            interactedWith: fromAddress,
            amount: amount
        }
        response.status(200).json({ message: "APPROVAL SUCCESS", success: true, data: { calldata: encodedCall, to: fromAddress, from: userAddress, value: 0 ,txnData: txnInfo } })
    } catch (e) {
        response.status(400).json({ message: "APPROVAL FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getSendERC20TokenCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromAddress, toAddress, amount } = request.body;
        const erc20Interface = new ethers.Interface(ERC20abi);
        const encodedCall = erc20Interface.encodeFunctionData("transfer", [toAddress, amount])
        console.log(encodedCall);
        const txnInfo = {
            action: "transfer",
            from: userAddress,
            token: fromAddress,
            interactedWith: fromAddress,
            toAddress: toAddress,
            amount: amount
        }
        response.status(200).json({ message: "TRANSFER SUCCESS", success: true, data: { calldata: encodedCall, to: fromAddress, from: userAddress, value: 0 ,txnData: txnInfo } });
    } catch (e) {
        response.status(400).json({ message: "TRANSFER FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getWrapTokenCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, amount, tokenAddress } = request.body;
        const wETHInterface = new ethers.Interface(WETHabi);
        const encodedCall = wETHInterface.encodeFunctionData("deposit", [])
        console.log(encodedCall);
        const txnInfo = {
            action: "deposit",
            from: userAddress,
            token: tokenAddress,
            interactedWith: tokenAddress,
            amount: amount
        }
        response.status(200).json({ message: "WRAPPING SUCCESS", success: true, data: { calldata: encodedCall, to: tokenAddress, from: userAddress, value: amount ,txnData: txnInfo } });
    } catch (e) {
        response.status(400).json({ message: "WRAPPING FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getUnwrapTokenCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, amount ,tokenAddress} = request.body;
        const wETHInterface = new ethers.Interface(WETHabi);
        const encodedCall = wETHInterface.encodeFunctionData("withdraw", [amount])
        console.log(encodedCall);
        const txnInfo = {
            action: "withdraw",
            from: userAddress,
            token: tokenAddress,
            interactedWith: tokenAddress,
            amount: amount
        }
        response.status(200).json({ message: "UNWRAPPING SUCCESS", success: true, data: { calldata: encodedCall, to:tokenAddress, from: userAddress, value: 0 ,txnData: txnInfo} });
    } catch (e) {
        response.status(400).json({ message: "UNWRAPPING FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getSwapErc20TokenToTokenCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromToken, toToken, amount, slippage } = request.body;
        const minAmount = (ethers.toBigInt(amount) * (ethers.toBigInt(10000) - ethers.toBigInt(slippage))) / ethers.toBigInt(10000);
        const pancakeSwapInterface = new ethers.Interface(PancakeSwapAbi);
        const encodedCall = pancakeSwapInterface.encodeFunctionData("swapTokensForExactTokens", [amount, minAmount, [fromToken, toToken], userAddress, (Date.now() + 30).toString()])
        console.log(encodedCall);
        const txnInfo = {
            action: "swapTokensForExactTokens",
            from: userAddress,
            token: fromToken,
            interactedWith: CONTRACT_ADDRESSES.PANCAKESWAP_ROUTER,
            amount: amount
        }
        response.status(200).json({ message: "SWAPPING SUCCESS", success: true, data: { calldata: encodedCall, to: CONTRACT_ADDRESSES.PANCAKESWAP_ROUTER, from: userAddress, value: 0 ,txnData: txnInfo} });
    } catch (e) {
        response.status(400).json({ message: "SWAPPING FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getVenusDepositCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromToken, amount } = request.body;
        const venusInterface = new ethers.Interface(VenusAbi);
        const encodedCall = venusInterface.encodeFunctionData("mint", [amount])
        console.log(encodedCall);
        const txnInfo = {
            action: "mint",
            from: userAddress,
            token: fromToken,
            interactedWith: fromToken,
            amount: amount
        }
        response.status(200).json({ message: "VENUS DEPOSIT SUCCESS", success: true, data: { calldata: encodedCall, to: fromToken, from: userAddress, value: 0 ,txnData: txnInfo} });
    } catch (e) {
        response.status(400).json({ message: "VENUS DEPOSIT FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getVenusRedeemCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromToken, amount } = request.body;
        const venusInterface = new ethers.Interface(VenusAbi);
        const encodedCall = venusInterface.encodeFunctionData("redeem", [amount])
        console.log(encodedCall);
        const txnInfo = {
            action: "redeem",
            from: userAddress,
            token: fromToken,
            interactedWith: fromToken,
            amount: amount
        }
        response.status(200).json({ message: "VENUS DEPOSIT SUCCESS", success: true, data: { calldata: encodedCall, to: fromToken, from: userAddress, value: 0 ,txnData: txnInfo} });
    } catch (e) {
        response.status(400).json({ message: "VENUS DEPOSIT FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getSwapEnsoCalldata = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromToken, toToken, amount, slippage, chainId } = request.body;
        const params = {
            fromAddress: userAddress,
            spender: userAddress,
            receiver: userAddress,
            tokenIn: fromToken,
            amountIn: amount.toString(),
            tokenOut: toToken,
            routingStrategy: "router",
            chainId: chainId,
            slippage: slippage,
            tokenInAmountToApprove: amount.toString()
        }
        const ensoResponse = await axios.get("https://api.enso.finance/api/v1/shortcuts/route?" + `${qs.stringify(params)}`, {
            headers: { Authorization: `Bearer ${ENV_VARIABLES.ENSO_API_KEY}` }
        })
        console.log(ensoResponse.data.tx);
        const txnInfo = {
            action: "swap",
            from: userAddress,
            token: fromToken,
            interactedWith: ensoResponse.data.tx.to,
            amount: amount
        }
        response.status(200).json({ message: "ENSO SUCCESS", success: true, data: { calldata: ensoResponse.data.tx.data, toAddress: ensoResponse.data.tx.to, from: userAddress, value: ensoResponse.data.tx.value ,txnData: txnInfo} });
    } catch (e) {
        response.status(400).json({ message: "ENSO FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getLifiSwap = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromChain, toChain, fromToken, toToken, amount } = request.body;
        const lifiSwap = await axios.get('https://li.quest/v1/quote', {
            params: {
                fromChain: fromChain,
                toChain: toChain,
                fromToken: fromToken,
                toToken: toToken,
                fromAmount: amount,
                fromAddress: userAddress,
            }
        }
        );
        console.log(lifiSwap.data.transactionRequest);
        const txnInfo = {
            action: "bridge",
            from: userAddress,
            token: fromToken,
            interactedWith: lifiSwap.data.transactionRequest.to,
            amount: amount
        }
        response.status(200).json({ message: "LIFI SUCCESS", success: true, data: { calldata: lifiSwap.data.transactionRequest.data, toAddress: lifiSwap.data.transactionRequest.to, from: userAddress, value: lifiSwap.data.transactionRequest.value ,txnData: txnInfo} });
    } catch (e) {
        response.status(400).json({ message: "LIFI FAILED", success: false, data: {} });
        console.log(e);
    }
}

export const getLimitOrderApi = async (request: Request, response: Response) => {
    try {
        const { userAddress, fromToken, toToken, amount, slippage, price } = request.body;
        const limitOrderInterface = new ethers.Interface(LimitOrderAbi);
        const encodedCall = limitOrderInterface.encodeFunctionData("createOrder", [price,amount,fromToken,toToken,"300",slippage])
        console.log(encodedCall);
        const txnInfo = {
            action: "createOrder",
            from: userAddress,
            token: fromToken,
            interactedWith: "0x2535c8ceFD2dF5B8eED094d439512B8679543b6e",
            amount: amount
        }
        response.status(200).json({ message: "LIMIT_ORDER SUCCESS", success: true, data: { calldata: encodedCall, to: "0x2535c8ceFD2dF5B8eED094d439512B8679543b6e", from: userAddress, value: 0 ,txnData: txnInfo} });
    } catch (e) {
        response.status(400).json({ message: "LIMIT_ORDER FAILED", success: false, data: {} });
        console.log(e);
    }
}