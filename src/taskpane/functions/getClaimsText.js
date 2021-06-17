async function getClaimsText(){
    let claimsText;
    await Word.run(async (context) => {

      let body = context.document.body;
      body.load();

      const claimsStart = body.search('What is claimed is:',{matchCase: false});
      const claimsEnd = body.search('ABSTRACT',{matchCase: true});

      const claimsRange = claimsStart.getFirst().getRange('After').expandTo(
        claimsEnd.getFirst().getRange('Start'));
      claimsRange.load();
      await context.sync();
      claimsText = claimsRange.text;

    });
    return claimsText;
  }

  export default getClaimsText