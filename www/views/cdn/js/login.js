var $ = window.$
var Auth0Lock = window.Auth0Lock

var lock = new Auth0Lock($('#root').attr('data-auth0-client-id'), $('#root').attr('data-auth0-domain'), { auth: {
  redirectUrl: $('#root').attr('data-auth0-redirect-url'),
  responseType: 'code',
  params: {
    scope: 'openid profile email'
  }
}})
lock.show()

$('#logIn').click(() => lock.show())
