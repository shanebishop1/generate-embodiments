import * as React from "react";
import PropTypes from "prop-types";
import { Button, ButtonType } from "office-ui-fabric-react";
import Progress from "./Progress";
import { length } from "file-loader";
import getClaimsText from '../functions/getClaimsText';
import { initializeClaimTree,findFirstClauseEndIndex } from "../Claim";
import splitClaims from '../functions/splitClaims';
import insertClaims from '../functions/insertClaims'
/* global Word */

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({

    });
  }
  
  click = async () => {
    let fullText = await getClaimsText();

    let claims = splitClaims(fullText)
    let claimMap = initializeClaimTree(claims);

    await insertClaims(claimMap.get('independent'));
    console.log(claimMap.get("independent"))

  }

  render() {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    const { title, isOfficeInitialized } = this.props;
    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">

          <p className="ms-font-l" style={{textAlign: 'center',}}>
            Click generate to create embodiments based on written claims
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            
            <Button
              className="ms-welcome__action"
              buttonType={ButtonType.hero}
              iconProps={{ iconName: "ChevronRight" }}
              onClick={this.click}
            >
              Generate
            </Button>

          </div>

      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  isOfficeInitialized: PropTypes.bool,
};
