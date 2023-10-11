const getChains = () => {
    let data = {
        'ethereummainnet': 'ETH_MAINNET',
        'polygonmainnet': 'POLYGON_MAINNET',
        'binancemainnet': 'BSC_MAINNET',
        'ethereumstaging': 'ETH_TEST_GOERLI',
        'polygonstaging': 'POLYGON_TEST_MUMBAI',
        'binancestaging': 'BSC_TESTNET'
    }

    return data;
}

module.exports = { getChains }