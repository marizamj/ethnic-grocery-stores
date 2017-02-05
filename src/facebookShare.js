const facebookInit = () => {
  window.fbAsyncInit = function() {
  window.FB.init({
      appId      : '702167243294973',
      xfbml      : true,
      version    : 'v2.8'
  });

    window.FB.XFBML.parse();
    window.FB.AppEvents.logPageView();
  };

  (function(d, s, id){
  let js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

const facebookShare = () => {
  window.FB.ui({
    hashtag: '#EthnicGroceryStores',
    method: 'share',
    href: 'https://ethnic-grocery-stores.firebaseapp.com/',
  }, function(response){});
};

export { facebookInit, facebookShare };
