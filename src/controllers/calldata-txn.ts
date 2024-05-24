import {ethers} from "ethers";
import { ERC20abi } from "../constants/abi/ERC20-ABI";
import { WETHabi } from "../constants/abi/WETH-ABI";
import { PancakeSwapAbi } from "../constants/abi/PancakeSwap-ABI";
import { VenusAbi } from "../constants/abi/Venus-ABI";
import { Request, Response } from "express";
import { CONTRACT_ADDRESSES } from "../constants/contractAddresses";
import { ENV_VARIABLES } from "../configurations/env";
import axios from "axios";
import qs from "qs";

export const getApproveERC20TokenCalldata = async (request: Request, response: Response) => {
    try {
        const {userAddress, fromAddress, toAddress , amount} = request.body;

        const erc20Interface = new ethers.Interface(ERC20abi);
        const encodedCall = erc20Interface.encodeFunctionData("approve",[toAddress,amount])
        response.status(200).json({ message: "APPROVAL SUCCESS", success: true, data: {calldata: encodedCall,to: fromAddress, from: userAddress,value: 0}});
        console.log(encodedCall);
    }catch(e){
        response.status(400).json({ message: "APPROVAL FAILED", success: false, data: {}});
        console.log(e);
    }
}

export const getSendERC20TokenCalldata = async (request: Request, response: Response) => {
    try {
        const {userAddress ,fromAddress, toAddress , amount} = request.body;
        const erc20Interface = new ethers.Interface(ERC20abi);
        const encodedCall = erc20Interface.encodeFunctionData("transfer",[toAddress,amount])

        response.status(200).json({ message: "TRANSFER SUCCESS", success: true, data: {calldata: encodedCall,to: fromAddress,from: userAddress ,value: 0}});
        console.log(encodedCall);
    }catch(e){
        response.status(400).json({ message: "TRANSFER FAILED", success: false, data: {}});
        console.log(e);
    }
}

export const getWrapTokenCalldata = async (request: Request, response: Response) => {
    try {
        const {userAddress,amount} = request.body;
        const wETHInterface = new ethers.Interface(WETHabi);
        const encodedCall = wETHInterface.encodeFunctionData("deposit",[])
        response.status(200).json({ message: "WRAPPING SUCCESS", success: true, data: {calldata: encodedCall,to: CONTRACT_ADDRESSES.WBNB, from: userAddress,value: amount}});
        console.log(encodedCall);
    }catch(e){
        response.status(400).json({ message: "WRAPPING FAILED", success: false, data: {}});
        console.log(e);
    }
}

export const getUnwrapTokenCalldata = async (request: Request, response: Response) => {
    try {
        const {userAddress,amount} = request.body;
        const wETHInterface = new ethers.Interface(WETHabi);
        const encodedCall = wETHInterface.encodeFunctionData("withdraw",[amount])
        response.status(200).json({ message: "UNWRAPPING SUCCESS", success: true, data: {calldata: encodedCall,to: CONTRACT_ADDRESSES.WBNB, from: userAddress, value: 0}});
        console.log(encodedCall);
    }catch(e){
        response.status(400).json({ message: "UNWRAPPING FAILED", success: false, data: {}});
        console.log(e);
    }
}

export const getSwapErc20TokenToTokenCalldata = async (request: Request, response: Response) => {
    try {
        const {userAddress,fromToken,toToken,amount,slippage} = request.body;
        const minAmount = (ethers.toBigInt(amount) * (ethers.toBigInt(10000) - ethers.toBigInt(slippage))) / ethers.toBigInt(10000);
        const pancakeSwapInterface = new ethers.Interface(PancakeSwapAbi);
        const encodedCall = pancakeSwapInterface.encodeFunctionData("swapTokensForExactTokens",[amount,minAmount,[fromToken,toToken],userAddress,(Date.now() + 30).toString()])
        response.status(200).json({ message: "SWAPPING SUCCESS", success: true, data: {calldata: encodedCall,to: CONTRACT_ADDRESSES.PANCAKESWAP_ROUTER, from: userAddress, value: 0}});
    }catch(e){
        response.status(400).json({ message: "SWAPPING FAILED", success: false, data: {}});
        console.log(e);
    }
}

export const getVenusDepositCalldata = async (request: Request, response: Response) => {
    try {
        const {userAddress,fromToken,amount} = request.body;
        const venusInterface = new ethers.Interface(VenusAbi);
        const encodedCall = venusInterface.encodeFunctionData("mint",[amount])
        response.status(200).json({ message: "VENUS DEPOSIT SUCCESS", success: true, data: {calldata: encodedCall,to: fromToken, from: userAddress, value: 0}});
    }catch(e){
        response.status(400).json({ message: "VENUS DEPOSIT FAILED", success: false, data: {}});
        console.log(e);
    }
}

export const getVenusRedeemCalldata = async (request: Request, response: Response) => {
    try {
        const {userAddress,fromToken,amount} = request.body;
        const venusInterface = new ethers.Interface(VenusAbi);
        const encodedCall = venusInterface.encodeFunctionData("redeem",[amount])
        response.status(200).json({ message: "VENUS DEPOSIT SUCCESS", success: true, data: {calldata: encodedCall,to: fromToken,from: userAddress ,value: 0}});
    }catch(e){
        response.status(400).json({ message: "VENUS DEPOSIT FAILED", success: false, data: {}});
        console.log(e);
    }
}

export const getSwapEnsoCalldata = async (request: Request, response: Response) => {
    try {
    const {userAddress,fromToken,toToken,amount, slippage, chainId} = request.body;
       const params = {
        fromAddress: userAddress,
        spender: userAddress,
        receiver: userAddress,
        tokenIn: fromToken,
        amountIn: amount,
        tokenOut: toToken,
        routingStrategy: "router",
        chainId: chainId,
        slippage: slippage,
        tokenInAmountToApprove: amount
       }
       const ensoResponse = await axios.get("https://api.enso.finance/api/v1/shortcuts/route?"+ `${qs.stringify(params)}`,{
        headers: { Authorization: `Bearer ${ENV_VARIABLES.ENSO_API_KEY}` }
       })
        response.status(200).json({ message: "ENSO SUCCESS", success: true, data: {calldata: ensoResponse.data.tx.data,toAddress: ensoResponse.data.tx.to,from: userAddress ,value: ensoResponse.data.tx.value}});
    }catch(e){
        response.status(400).json({ message: "ENSO FAILED", success: false, data: {}});
        console.log(e);
    }
}