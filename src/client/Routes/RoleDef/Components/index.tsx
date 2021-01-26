import * as React from 'react';

import { ThemeContext } from '../../../Context';
import RoleListComponent from './RoleList';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as actions from "../../../redux/actions/action";
/**
 * Root component which calls the list component to show the existing role list
 * Then list component calls different other components like create, members, etc
 * @extends React.Component
 */
class RoleDefComponent extends React.Component<any, any>{
  constructor(props: any, state: any) {
    super(props);
    this.state = {
      publishedItemState: []
    };
  }
  /**
   * Render the component to the DOM
   * @returns {}
   */
  componentDidMount() {
    this.props.getPublishedItems();
  }
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.publishedItems !== prevState.publishedItemState) {
      return {
        publishedItemState: nextProps.publishedItems
      };
    } else {
      return null;
    }
  }
  displayDeletedItems = (value: any) => {

    if (value === true) {
      this.props.handleCheckBoxValue(value)
    }
    else {
      this.props.getPublishedItems();
    }
  }

  render() {
    return (
      <div>
        {
          <ThemeContext.Consumer>
            {
              theme => (
                <RoleListComponent
                  theme={theme}
                  roleDefs={this.state.publishedItemState}
                  searchByNameAndDescription={(searchText: any) => this.props.searchMethod(searchText)}
                  handleCheckBox={(value: any) => this.displayDeletedItems(value)}
                />
              )
            }
          </ThemeContext.Consumer>

        }
      </div>
    );
  }
}
// Grab the characters from the store and make them available on props
const mapStateToProps = (props: any) => {
  return {
    publishedItems: props.reduxReducer.allItemsReducer
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, null, any>, props: any) => {
  return {
    getPublishedItems: () => {
      dispatch<any>(actions.getPublishedItems());
    },
    searchMethod: (search: any) => {
      dispatch<any>(actions.searchByNameAndDescription(search))
    },
    handleCheckBoxValue: (value: any) => {
      dispatch<any>(actions.getAllItems());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoleDefComponent);
