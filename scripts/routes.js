'use strict';

page( '/'
  , () => app.view.initLoginPage()
);

page( '/search'
  , () => app.view.initSearchPage()
);

page( '/about'
  , () => app.view.initAboutPage()
);

page();