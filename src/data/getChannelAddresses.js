const getChannelAddresses = () => {
  const data = {
    ETH_MAINNET: [
      // "0x1a9dDEf485674fC60a269cf97FAbc6b8728A3497", // 1inch
      "0x48De2669db5C2da4bf36C29ef9CFd62057B4b6C8", // Price Tracker
      "0xAA940b3501176af328423d975C350d0d1BaAae50", // Aave
      "0xa2dee32662f6243da539bf6a8613f9a9e39843d3", // Angle Protocol
      "0xaf962c18538A6498AcC9980b3Da74E0D9A131eBa", // Aragon
      "0x5afedef166bd626b3043cb1d53e16ea9bf863e06", // Armor
      "0x7F41abf7fDb9E4A6373EC3BAB3Df814b5CCceCC3", // Bancor
      "0x4E15B14B9950A04370E36f2Ec05546ED5867ADeF", // Bankless
      "0xb1676B5Ab63F01F154bb9938F5e8999d9Da5444B", // Boardroom
      "0x03EAAAa48ea78d1E66eA3458364d553AD981871E", // BTC Tracker
      "0x174e4Bb368B9a31661B4C35bE595369fF1A68a13", // Carrot
      "0xe56f1d3edfff1f25855aef744cafe7991c224fff", // CoinDesk
      "0xde3e447E125FA2391DC9BCbfA0B821424422FEAF", // Cryptocurrency Jobs
      "0x0B430A1651E6A64510afC97195040359941d0b23", // Crypto Manga
      "0x2dbf5aFead4759E6151590E4a8F6cD596B7044F8", // CVI
      "0xBCAc4dafB7e215f2F6cb3312aF6D5e4F9d9E7eDA", // Decentraland
      "0x54728f10F525193A61Ded237707f2d5022cA4977", // Developer DAO
      "0x23c6b8fB0557FD5e6696BceF3fD4855E0d7018C0", // dYdX
      "0x349da2A6825284E9E181D46D664b95aecE86da56", // Element DAO
      "0x983110309620D911731Ac0932219af06091b6744", // ENS
      "0xfE4A6Fbd27B496855245A1e8047F693f0aDfDb08", // Push Governance
      "0x2B8ffb4460550Dbe8Ec1cEA9C1B61322dB56B082", // ETH Gas Price Tracker
      // "0x64F4fba925CbDe309acC875b8Af2feb07f2aCCA0", // ETHIndia
      // "0x77f319B1d9c43a8B729399f81515166632100744", // EthSign Signatures
      "0xDBc5936E4daaE94F415C39D284f6a69c4d553F2F", // 	ETH Tracker
      "0x361Cb6BE977d0113A33914A8f952Ced95747F793", // Fabwelt
      "0x361Cb6BE977d0113A33914A8f952Ced95747F793", // Fabwelt
      // "0xe8381F84a32A4C2B08c328BfF68c0E889a34F255", // GoodGhosting
      "0xf4b71ceF90736Eb644Cc678b2C795ACdeaC198E1", // Google BigQuery
      "0xFb3bD022D5DAcF95eE28a6B07825D4Ff9C5b3814", // Idle Finance
      "0x91c9D4373B077eF8082F468C7c97f2c499e36F5b", // KyberSwap
      "0xef6426D522CfE5B7Ae5dB05623aB0Ef78023dBe0", // Lens Protocol
      "0xCB1e9fA11Edd27098A6B2Ff23cB6b79183ccf8Ee", // LiFi
      "0x64A971F0D01b3555Ac60B9Bd151d5B7A75cf12Fd", // MahaDAO
      "0x8Cd0ad5C55498Aacb72b6689E1da5A284C69c0C7", // MakerDAO
      // "0x19A6C52bd08898F8Ee5c6ba3FB67AFd184be8034", // Polygon Bridge
      // "0x2f5ccA6f594118ef54f4157927A323BaA982Fd78", // Mean Finance
      "0xb754601d2C8C1389E6633b1449B84CcE57788566", // Mover
      "0x72252a31fd67d2facbe6d189f5861c5553474447", // 	Nord Finance
      "0x12b3eE60Df8ea26D03b8035Ec90434a38A82C4C7", // Oasis.app
      "0x9B43a385E08EE3e4b402D4312dABD11296d09E93", // Ooki
      "0x6575A93aBdFf85e5A6b97c2DB2b83bCEbc3574eC", // 	Phuture
      "0xFB9684ec1026513241F777485911043DC2aA9a4f", // Pine Protocol
      "0xb4F88Ad000A53638F203dcA2C39828a58057d53c", // Pods
      // "0x27F68B2C092DB48928D70EA781F7dE8B844ad07B", // Polychain Monsters
      // "0xdc0964aaacE97CF4E7476B4EEbC924730E524ade", // PoolTogether
    ],

    POLYGON_MAINNET: [
      "0xaf962c18538A6498AcC9980b3Da74E0D9A131eBa", // Aragon
      "0x64F4fba925CbDe309acC875b8Af2feb07f2aCCA0", // ETHIndia
      "0x77f319B1d9c43a8B729399f81515166632100744", // EthSign Signatures
      "0xe8381F84a32A4C2B08c328BfF68c0E889a34F255", // 	GoodGhosting
      "0xef6426D522CfE5B7Ae5dB05623aB0Ef78023dBe0", // Lens Protocol
      "0x64A971F0D01b3555Ac60B9Bd151d5B7A75cf12Fd", // MahaDAO
      "0x19A6C52bd08898F8Ee5c6ba3FB67AFd184be8034", // 	Polygon Bridge
      "0x2f5ccA6f594118ef54f4157927A323BaA982Fd78", // Mean Finance
      "0x27F68B2C092DB48928D70EA781F7dE8B844ad07B", // Polychain Monsters
      "0xdc0964aaacE97CF4E7476B4EEbC924730E524ade", // PoolTogether
    ],

    BSC_MAINNET: [
      "0x1a9dDEf485674fC60a269cf97FAbc6b8728A3497", // 1inch
      "0x0e255B1900b8cE23f8E818C7Ee08cfd5b41df748", // ApeSwap
    ],

    // ETH_TEST_GOERLI: [
    //   "0xEfb06d3CbF3ff314782c5E33311deB00EB501a2b",
    //   "0x3649E43D0C73898dd86f225598f1A6AA5f03b765",
    //   "0x15C5a74e6091e304c997c53D225eBc759ADda768",
    //   "0x8Dab13B3b654e00790f84Cb41876812FCC840367",
    //   "0xb24bfD3A7A9C41404b2ac35a0aF3cb69305C8615",
    //   "0x2A727f5897aB9ACfC0210402fa9b45eB2bEDA2E8",
    //   "0xce3Cb7781195F2BA6b464133965B56e293DD9ed7",
    //   "0xbAE1338219a9BDDB38d38B77094e833995B703E2",
    //   "0x08D0A7DB26E30a0b5f157dc97D8cAdB948c3c913",
    //   "0xc6D3f720f528E29572c1f42a2cA8c6529d4E2bd4",
    //   "0xBC9aCf8B65D25aB842289853987dB6F885d6d25E",
    //   "0xBCd510D960f310438628eD19c88f50dc95051C70",
    //   "0x1463f7373342E34934c9AfFC8F8aaF8bCBE8D919",
    // ],

    // POLYGON_TEST_MUMBAI: ["0x8F762418C374DFf40D842E6992758728e4ef0DBA"],

    // BSC_TESTNET: [
    //   "0xd06bD8c2014dfcdF23440247D61B4e1C14755412",
    //   "0x6450BBEf37AABdc96e556b9d599BFB8a7023A3B8",
    //   "0x03D23465Cf6cE7c564CFC9382C8Eb73d3c1301a3",
    //   "0x8A450E3c888B1c952dC6bD19B7aa17f655b0a00B",
    // ],
  };

  return data;
};

module.exports = { getChannelAddresses };
