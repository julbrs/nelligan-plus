import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadBookInfo, renewBook } from '../actions'
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';
import Icon from 'react-bulma-components/lib/components/icon';

class Book extends Component {
  constructor() {
    super();
    this.handleRenew = this.handleRenew.bind(this);
  }

  componentDidMount() {
    this.props.loadBookInfo(this.props.book);
  }

  renderImage() {
    if(typeof this.props.book.thumb !== 'undefined') {
      return (<Image alt="thumb" src={this.props.book.thumb} />)
    }
    else {
      return <Image alt="64x64" src="http://bulma.io/images/placeholders/64x64.png" />
    }
  }

  handleRenew() {
    this.props.renewBook(this.props.book);
  }

  getStatus() {
    if(this.props.book.err !== undefined) {
      return "error"
    }
    var todayPlusFewDays = new Date();
    todayPlusFewDays.setDate(todayPlusFewDays.getDate()+3);
    var duedate=new Date("20"+this.props.book.duedate);
    if(todayPlusFewDays>duedate) {
      return "warning"
    }
  }

  render() {
    return (
      <Media key={this.props.book.barcode} className={this.getStatus()}>
        <Media.Item renderAs="figure" position="left">
          {this.renderImage()}
        </Media.Item>
        <Media.Item>
          <Content>
            <p>
              <strong>{this.props.book.title}</strong>
              <br/>
              Card: {this.props.book.card.name} <strong>{this.props.book.err}</strong>
            </p>
          <Level>
            <Level.Side align="left">
              <Level.Item>
                <Icon>
                  <i className="fa fa-reply" />
                </Icon>
              </Level.Item>
              <Level.Item>
                <Icon>
                  <i className="fa fa-retweet" onClick={this.handleRenew}/>
                </Icon>
              </Level.Item>
              <Level.Item>
                <Icon>
                  <i className="fa fa-heart" />
                </Icon>
              </Level.Item>
            </Level.Side>
          </Level>
          </Content>
        </Media.Item>
        <Media.Item position="right">
            <small>{this.props.book.duedate}</small><br />
            <small>Renew: {this.props.book.renew}</small><br />
            <Icon>
              <i title="Renew" className="fa fa-retweet"/>
            </Icon>
        </Media.Item>
      </Media>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBookInfo: (book) => dispatch(loadBookInfo(book)),
        renewBook: (book) => dispatch(renewBook(book))
    };
};

export default connect(null, mapDispatchToProps)(Book);
