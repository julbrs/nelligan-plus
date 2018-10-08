import React, { Component } from 'react';

class Header extends Component {

render() {
  return (
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Nelligan+++
          </h1>
          <h2 class="subtitle">
            Manage your mulltiple Nelligan accounts with a single application.
            All cards are stored in cache of your browser, a backend is present
            only to request for books information.
          </h2>
        </div>
      </div>
    </section>
  );
  }
}

export default (Header);