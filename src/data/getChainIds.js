const getChainIds = () => {
    let data = {
        'ethereummainnet': 1,
        'polygonmainnet': 137,
        'binancemainnet': 56,
        'ethereumstaging': 5,
        'polygonstaging': 80001 ,
        'binancestaging': 97
    }

    return data;
}

module.exports = { getChainIds }