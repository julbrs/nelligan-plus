import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadBookInfo } from '../actions'
import {  Media, Image, Content, Level, Icon, Delete } from 'reactbulma'


class Book extends Component {

  componentDidMount() {
    this.props.loadBookInfo(this.props.book);
  }

  renderImage() {
    if(typeof this.props.book.thumb !== 'undefined') {
      return (<Image  size={64} alt="64x64" src={this.props.book.thumb} />)
    }
    else {
      return <Image  size={64} alt="64x64" src="http://bulma.io/images/placeholders/64x64.png" />
    }
  }

  render() {
    return (
      <Media key={this.props.book.barcode}>
        <Media.Left>
          {this.renderImage()}
        </Media.Left>
        <Media.Content>
          <Content>
            <p>
              <strong>{this.props.book.title}</strong> <small>{this.props.book.duedate}</small>
              <br/>
              Barcode: {this.props.book.barcode}
              <br/>
              ISBN: {this.props.book.isbn}
              <br/>
              record: {this.props.book.record}
            </p>
          </Content>
          <Level mobile>
            <Level.Left>
              <Level.Item>
                <Icon small>
                  <i className="fa fa-reply" />
                </Icon>
              </Level.Item>
              <Level.Item>
                <Icon small>
                  <i className="fa fa-retweet" />
                </Icon>
              </Level.Item>
              <Level.Item>
                <Icon small>
                  <i className="fa fa-heart" />
                </Icon>
              </Level.Item>
            </Level.Left>
          </Level>
        </Media.Content>
        <Media.Right>
          <Delete />
        </Media.Right>
      </Media>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookInfo: (book) => dispatch(loadBookInfo(book))
    };
};

export default connect(null, mapDispatchToProps)(Book);
