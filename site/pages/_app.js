import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import Head from "next/head";

import makeStore from "../redux/store";
import Wrapper from "../src/Wrapper";

class MyApp extends App {
  render() {
    const { Component, store, pageProps } = this.props;
    const { isLoggedIn } = store.getState().auth;
    return (
      <Container>
        <Head>
          <link ref={"text/stylesheet"} href={"/static/main.css"} />
        </Head>
        <Provider store={store}>
          <Wrapper>
            <Component pageContext={this.pageContext} {...pageProps} />
            {isLoggedIn ? <CallingModal /> : null}
          </Wrapper>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
