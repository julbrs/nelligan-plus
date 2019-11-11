import React  from 'react';
import { Hero, Footer, Container, Content } from 'react-bulma-components/full';

function PageFooter() {
  return (
    <Hero.Footer>
        <Footer>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <p>
                <strong>Nelligan+</strong> par <a href="http://github.com/bobman38" target="_blank">Julien Bras</a> | <a href="https://github.com/bobman38/nelligan-plus/issues/new/choose" target="_blank">Bugs ?</a><br/>
                Parlez de Nelligan+ sur <a href="https://www.facebook.com/nelliganapp" target="_blank"><i className="fa fa-facebook"/></a> !
              </p>
            </Content>
          </Container>
        </Footer>
      </Hero.Footer>
  )
}

export default PageFooter;