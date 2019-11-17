import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadBookInfo, renewBook } from '../actions'
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';
import Icon from 'react-bulma-components/lib/components/icon';
import Box from 'react-bulma-components/lib/components/box';


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
      <Box className={`book ${this.getStatus()}`}>
      <Media key={this.props.book.barcode}>
        <Media.Item renderAs="figure" position="left">
          {this.renderImage()}
        </Media.Item>
        <Media.Item>
          <Content>
            <p>
              <strong>{this.props.book.title}</strong>
              <br/>
            </p>
            <small>
            <Level breakpoint="mobile">
              <Level.Side align="left">
                <Level.Item>
                  <Icon>
                    <i title="Date" className="fa fa-calendar"/>
                  </Icon>
                  <small>{this.props.book.duedate}</small>
                </Level.Item>
              </Level.Side>
              <Level.Side>
                <Level.Item>
                  <Icon>
                    <i title="Carte" className="fa fa-id-card-o"/>
                  </Icon>
                  {this.props.book.card.name} <strong>{this.props.book.err}</strong>
                </Level.Item>
              </Level.Side>
              <Level.Side align="right">
                <Level.Item>
                  <Icon>
                    <i title="Renouveller" className="fa fa-retweet" onClick={this.handleRenew}/>
                  </Icon>
                  ({this.props.book.renew})
                </Level.Item>
              </Level.Side>
            </Level>
          </small>
          </Content>
        </Media.Item>
      </Media>
      </Box>
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
