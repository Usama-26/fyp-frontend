/* const escrowAddress = "0xa6b2A51E4E2703d9b5357dAaA848f5F825fbAbca";

const escrowABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "pId",
        type: "string",
      },
      {
        internalType: "address",
        name: "fAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "awardProject",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethereumPrice",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "freelancer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethereumPrice",
        type: "uint256",
      },
    ],
    name: "ProjectAwarded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "pId",
        type: "string",
      },
    ],
    name: "releasePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]; */

const escrowAddress = "0x653dC5991D239752936837E6fdfD4e450A875D31";
const escrowABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "pId",
        type: "string",
      },
      {
        internalType: "address",
        name: "fAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "awardProject",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethereumPrice",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "client",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "freelancer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ethereumPrice",
        type: "uint256",
      },
    ],
    name: "ProjectAwarded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "pId",
        type: "string",
      },
    ],
    name: "releasePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export { escrowABI, escrowAddress };
