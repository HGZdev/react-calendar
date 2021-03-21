import React from "react";
import {GlobalStyle, Theme, defaultThemesSet} from "Styles";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Header, Footer} from "./PageWrappers";
import MediaQueryProvider from "plugins/MediaQuery";
import PageWrap from "./Components/PageWrap";
import {MetaData} from "./Components/MetaData";
import {pages} from "./settings";
import ScrollToTop from "./Components/ScrollToTop";
import ErrorPage from "./Components/ErrorPage";

const App = () => {
  return (
    <Theme theme={defaultThemesSet}>
      <MediaQueryProvider>
        <BrowserRouter>
          <GlobalStyle />
          <ScrollToTop />
          <MetaData />
          <Switch>
            <PageWrap header={<Header />} footer={<Footer />}>
              <Switch>
                {pages.map(({path, exact, component}, i) => (
                  <Route key={i} {...{exact, path: `/${path}`, component}} />
                ))}
                <Route component={ErrorPage} />
              </Switch>
            </PageWrap>
          </Switch>
        </BrowserRouter>
      </MediaQueryProvider>
    </Theme>
  );
};

export default App;
