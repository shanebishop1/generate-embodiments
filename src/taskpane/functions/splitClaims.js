function splitClaims(text){
    const decimalDot = /\d\./;
    let re = new RegExp('\\s+|\t\+|\\n+|\\r+','g')

    const claimList = text.split(decimalDot);

    for(let i = 0; i<claimList.length;i++){
        claimList[i] = claimList[i].replace(new RegExp('\\r+\\d+','g'),'')
        claimList[i] = claimList[i].trim();
    }
    for(let i = 0; i<claimList.length;i++){
        claimList[i] = claimList[i].replace(re,' ')
        claimList[i] = claimList[i].trim();
    }
    for(let i = 0; i<claimList.length;i++){
        claimList[i] = claimList[i].replace(new RegExp('\\s+','g'),' ')
        claimList[i] = claimList[i].trim();
    }

    claimList.shift()

    return claimList;
}
export default splitClaims