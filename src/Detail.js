import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class Detail extends Component {
  state  = {
    change: false,
    id: this.props.params.id,
    date: this.props.params.date


  };
  undo() {

  }
  render() {
    const { item } = this.props;
      console.log(this.props);
    return (
      <div>
        Detail!!
        <input
          type="text"
          defaultValue={this.state.id}
          onChange={e =>
            e.target.value !== this.state.id ?
              this.setState({ change: true, id: e.target.value}) : this.setState({ change: false })}
        />
        <input
          type="text"
          defaultValue={this.state.date}
           onChange={e =>
             e.target.value !== this.state.date ?
               this.setState({change: true, date: e.target.value }) : this.setState({ change: false })}
        />
        <button disabled={!this.state.change} onClick={() => this.props.onUpdateTrack(this.state.id, this.state.date)}>Save</button>
        <button
          disabled={!this.state.change}
          onClick={this.undo}
        >Undo</button>
      </div>
    );
  }
}

const mapStateToProps = (state, params) =>  {
    console.log('params', params);

    return ({
        data: state.filter(params => params.date === params.params)


    });

};



// const mapStateToProps = (state, params) => ({
//     date: state,
//     id: state
//
// });

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateTrack: (id, date) => dispatch({
            type: 'UPDATE_TRACK',
            payload: {
                id: id,
                date: date

            }
        })
    }
};

// export default connect((state, props) => {
//   console.log(state, props);
//   return ({
//     item: state.filter(item => item.date === props.params.date)[0],
//   })
// })(Detail);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);


