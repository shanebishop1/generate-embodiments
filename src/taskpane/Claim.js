import { themeRulesStandardCreator } from "office-ui-fabric-react";


export function checkIndependence(text){
    if(text[0]==='A') return true;
    return false;
}


export function findDirectParentNumber(claim){
    let numPostOfClaim = claim.text.indexOf("of claim")+9;
    return Number(claim.text.substring(numPostOfClaim, findFirstClauseEndIndex(claim)));
}


export function findFirstClauseEndIndex(claim){
    return claim.text.indexOf("of claim")+9+claim.text.substring(claim.text.indexOf("of claim")+9).indexOf(',');
}


export function findType(claim){
    let typeLanguage = ['system','media','medium','method','device','apparatus','process'];
    for(let word of claim.text.split(' ')){
        for(let type of typeLanguage){
            if(word.indexOf(type)!=-1){
                return type;
            }
        }
    }
    return '';
}


export function initializeClaimTree(claims){

    let claimMap = new Map();
    let allClaims = [];
    let indClaims = [];
    let depClaims = [];

    claimMap.set("all",allClaims);
    claimMap.set("independent",indClaims);
    claimMap.set("dependent",depClaims);

    // Initialize all claims and independence status based on claims text
    for(let i = 0; i < claims.length; i++){
      let independence = checkIndependence(claims[i]);
      let newClaim = new Claim(i,claims[i]);

      if(independence){
        newClaim.independence = true;
        indClaims.push(newClaim);
      }

      else{
        // Number as placeholder; will link to object later
        newClaim.directParent = findDirectParentNumber(newClaim);
        depClaims.push(newClaim);
      }
      allClaims.push(newClaim);
    }

    // Set direct parents
    for(let depClaim of depClaims){
      let parent = allClaims.find(claim => claim.claimNumber === depClaim.directParent);
      depClaim.directParent = parent;
    }

    // Set root parents
    for(let depClaim of depClaims){
      let root = depClaim.directParent;
      while(root.directParent != null){
        root = root.directParent;
      }
      depClaim.rootParent = root;
    }

    // Set direct/general dependents and type
    for(let claim of allClaims){
      claim.type = findType(claim);
      let directDependents = depClaims.filter(depClaim => {
        return depClaim.directParent === claim
      })
      let allDependents = depClaims.filter(depClaim => {
        return depClaim.rootParent === claim
      })

      claim.allDependents = allDependents;
      claim.directDependents = directDependents;
    }
    return claimMap;
}


class Claim{
    claimNumber;
    text;
    independence;
    directParent;
    rootParent;
    directDependents;
    allDependents;
    type;

    constructor(claimNumber,text){
        this.claimNumber = claimNumber+1;
        this.text = text;
        this.independence = false;
        this.directParent = null;
        this.rootParent = null;
        this.directDependents = [];
        this.allDependents = [];
        this.type = '';
    }

    get claimNumber(){
        return this.claimNumber;
    }

    get text(){
        return this.text;
    }

    set independence(independence){
        this.independence = independence;
    }

    get independence(){
        return this.independence;
    }

    set directParent(directParent){
        this.directParent = directParent;
    }

    get directParent(){
        return this.directParent;
    }

    get rootParent(){
        return this.rootParent;
    }

    set directDependents(directDependents){
        this.directDependents = directDependents;
    }

    get directDependents(){
        return this.directDependents;
    }

    set allDependents(allDependents){
        this.allDependents = allDependents;
    }

    get allDependents(){
        return this.allDependents;
    }

    set type(type){
        this.type = type;
    }

    get type(){
        return this.type;
    }

}
export default Claim