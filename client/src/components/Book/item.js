import React, {useEffect, useState} from 'react'
import Media from 'react-bulma-components/lib/components/media'
import Image from 'react-bulma-components/lib/components/image'
import Content from 'react-bulma-components/lib/components/content'
import Level from 'react-bulma-components/lib/components/level'
import Icon from 'react-bulma-components/lib/components/icon'
import Box from 'react-bulma-components/lib/components/box'
import Columns from 'react-bulma-components/lib/components/columns'

import axios from 'axios'
const api = process.env.REACT_APP_API

const BookItem = (props) => {
  const [bookInfo, setBookInfo] = useState({})
  const [error, setError] = useState()
  const {book} = props

  useEffect(() => {
    axios.get(`${api}book/${book.record}`)
      .then(res => {
        setBookInfo(res.data)
      })
  }, [book] /* refresh only if book is changing not bookInfo ! */)

    const renderImage = () => {
        if(typeof bookInfo.thumb !== 'undefined') {
          return (<Image alt="thumb" src={bookInfo.thumb} />)
        }
        else {
          return <Image alt="64x64" src="http://bulma.io/images/placeholders/64x64.png" />
        }
      }
    
    const handleRenew = () => {
      // TODO handle renew !
      axios.get(`${api}book/renew/${book.barcode}`, {
        params: {
          code: book.card.code,
          pin: book.card.pin,
          rid: book.rid,
          rvalue: book.rvalue
        }
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        // if error during renew
        setError(err.response.data.msg)
      })
    }
    
    const getStatus = () => {
        if(book.err !== undefined) {
          return "error"
        }
        var todayPlusFewDays = new Date();
        todayPlusFewDays.setDate(todayPlusFewDays.getDate()+3);
        var duedate=new Date("20"+book.duedate);
        if(todayPlusFewDays>duedate) {
          return "warning"
        }
      }

    return (
      <Columns.Column size={6}>
        <Box className={`book ${getStatus()}`}>
        <Media key={book.barcode}>
          <Media.Item renderAs="figure" position="left">
            {renderImage()}
          </Media.Item>
          <Media.Item>
            <Content>
              <p>
                <strong>{book.title}</strong>
                <br/>
              </p>
              <small>
              <Level>
                <Level.Item>
                  <Icon>
                    <i title="Date" className="fa fa-calendar"/>
                  </Icon>
                  <small>{book.duedate}</small>
                </Level.Item>
                <Level.Item>
                  <Icon>
                    <i title="Carte" className="fa fa-id-card-o"/>
                  </Icon>
                  {book.card && book.card.name} <strong>{error}</strong>
                </Level.Item>
                <Level.Item>
                  <Icon>
                    <i title="Renouveller" className="fa fa-retweet" onClick={handleRenew}/>
                  </Icon>
                  ({book.renew})
                </Level.Item>
              </Level>
            </small>
            </Content>
          </Media.Item>
        </Media>
        </Box>
      </Columns.Column>
      )
}

export default BookItem
