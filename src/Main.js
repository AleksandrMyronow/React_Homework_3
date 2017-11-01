import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Main extends Component {
  addTrack() {
    this.props.onAddTrack(this.trackInput.value);
  }

  render() {
    // console.log(this.props.data);
    return (
      <div>
        <input type="text" ref={(input) => {this.trackInput = input }}/>
        <button onClick={this.addTrack.bind(this)}>Add track</button>
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Task</td>
              <td>Show details</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
          {
            this.props.data.map( (item, id, key) => (
              <tr id={key}>
                <td>{item.date}</td>
                <td>{item.id}</td>
                <td>
                  <Link to={`/detail/${item.date}`}>
                    View details
                  </Link>
                </td>
                <td>
                  <button onClick={() => this.props.onDeleteTrack(id)}>
                    Delete
                  </button>
                </td>
              </tr>
              )
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}





const mapStateToProps = (state) => ({
    data: state
});

const mapDispatchToProps = (dispatch) => ({
    onAddTrack: id => dispatch({
        type: 'ADD_TRACK',
        payload: {
            id,
            date: new Date().toLocaleTimeString(),
        },
    }),
    onDeleteTrack: id => dispatch({
        type: 'DELETE_TRACK',
        payload: id
    })
    // ,
    // onUpdateTrack: (date, trackName) => dispatch({
    //     type: 'UPDATE_TRACK',
    //     payload: {
    //         date,
    //         trackName//по клику переносим нашу функцию апдейт в детайл и по кнопке сейв переносим и передаем дейт и дату
    //     }
    // })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);