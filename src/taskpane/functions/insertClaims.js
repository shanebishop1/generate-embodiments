
import {findFirstClauseEndIndex} from '../Claim';
async function insertClaims(independentClaims){
    await Word.run(async (context) => {
        let embodimentNum = 1;
        let endNum;

        let body = context.document.body;
        body.load();
        await context.sync();

        body.insertBreak(Word.BreakType.page, Word.InsertLocation.end);
        body.insertText("Enumerated Embodiments:\n",Word.InsertLocation.end);

        for(let indClaim of independentClaims){
            body.insertText(embodimentNum+'. '+indClaim.text+'\n',Word.InsertLocation.end);
            let indEmbodiNumber = embodimentNum;
            embodimentNum = embodimentNum + 1;
            endNum = embodimentNum-1;
            await claimCombos(indClaim, indEmbodiNumber);
        }

        async function claimCombos(claim, indEmbodiNumber){
            let plural = ' of embodiment '+indEmbodiNumber+', ';
            if(claim.directDependents.length===0){
                return;
            }
            for(let child of claim.directDependents){
                if(indEmbodiNumber!==endNum){
                    plural = ' of any one of embodiments '+indEmbodiNumber+'-'+endNum+', ';
                }
                body.insertText(embodimentNum+'. The '+child.type+plural+child.text.substring(findFirstClauseEndIndex(child)+2)+'\n',Word.InsertLocation.end);
                embodimentNum = embodimentNum + 1;
                endNum = endNum + 1;
                await claimCombos(child,indEmbodiNumber);
            }
        }
        await context.sync();
    });
}
export default insertClaims